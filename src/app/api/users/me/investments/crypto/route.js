import { withErrorHandler, apiSuccess, apiError } from "@/utils/errorHandler";
import { getAuthUserId } from "@/lib/auth";
import { buyPlanSchema } from "@/lib/validation";
import { debitWallet } from "@/services/walletService";
import prisma from "@/lib/prisma";

/**
 * POST /api/users/me/investments/crypto — Buy a crypto investment plan
 */
export const POST = withErrorHandler(async (req) => {
    const userId = await getAuthUserId();
    if (!userId) return apiError("Unauthorized", 401);

    const body = await req.json();
    const parsed = buyPlanSchema.safeParse(body);

    if (!parsed.success) {
        return apiError(parsed.error.errors[0].message, 400);
    }

    const { amount, planId } = parsed.data;

    // Get plan
    const plan = await prisma.investmentPlan.findUnique({ where: { id: planId } });
    if (!plan) return apiError("Investment plan not found", 404);

    // Validate amount
    if (amount < parseFloat(plan.minDeposit)) {
        return apiError(`Minimum deposit is $${plan.minDeposit}`, 400);
    }
    if (amount > parseFloat(plan.maxDeposit)) {
        return apiError(`Maximum deposit is $${plan.maxDeposit}`, 400);
    }

    // Calculate end date
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + plan.contractDuration);

    // Create investment and debit wallet in a transaction
    const investment = await prisma.$transaction(async (tx) => {
        const inv = await tx.investment.create({
            data: {
                userId,
                planId,
                planType: plan.type,
                amount,
                startDate,
                endDate,
            },
        });

        return inv;
    });

    // Debit wallet (separate transaction with locking)
    await debitWallet(userId, {
        amount,
        category: "INVESTMENT",
        description: `Invested in ${plan.title}`,
        referenceId: investment.id,
    });

    return apiSuccess({ investmentId: investment.id }, 201, "Plan purchased successfully");
});
