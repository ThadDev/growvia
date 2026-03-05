export const dynamic = 'force-dynamic';
import { withErrorHandler, apiSuccess, apiError } from "@/utils/errorHandler";
import { getAuthUserId } from "@/lib/auth";
import { buyPlanSchema } from "@/lib/validation";
import { debitWallet } from "@/services/walletService";
import prisma from "@/lib/prisma";

/**
 * POST /api/users/me/investments/real-estate — Buy a real estate investment plan
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

    const plan = await prisma.investmentPlan.findUnique({ where: { id: planId } });
    if (!plan) return apiError("Investment plan not found", 404);

    if (amount < parseFloat(plan.minDeposit)) {
        return apiError(`Minimum deposit is $${plan.minDeposit}`, 400);
    }
    if (amount > parseFloat(plan.maxDeposit)) {
        return apiError(`Maximum deposit is $${plan.maxDeposit}`, 400);
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + plan.contractDuration);

    const investment = await prisma.investment.create({
        data: {
            userId,
            planId,
            planType: plan.type,
            amount,
            startDate,
            endDate,
        },
    });

    await debitWallet(userId, {
        amount,
        category: "INVESTMENT",
        description: `Invested in ${plan.title}`,
        referenceId: investment.id,
    });

    return apiSuccess({ investmentId: investment.id }, 201, "Plan purchased successfully");
});
