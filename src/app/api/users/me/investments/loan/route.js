import { withErrorHandler, apiSuccess, apiError } from "@/utils/errorHandler";
import { getAuthUserId } from "@/lib/auth";
import { debitWallet } from "@/services/walletService";
import prisma from "@/lib/prisma";

/**
 * POST /api/users/me/investments/loan — Request a loan
 */
export const POST = withErrorHandler(async (req) => {
    const userId = await getAuthUserId();
    if (!userId) return apiError("Unauthorized", 401);

    const body = await req.json();
    const { planId, amount, startDate } = body;

    if (!planId || !amount) {
        return apiError("Plan and amount are required", 400);
    }

    const plan = await prisma.investmentPlan.findUnique({ where: { id: planId } });
    if (!plan || plan.type !== "loan") return apiError("Loan plan not found", 404);

    const amountNum = Number(amount);

    const start = startDate ? new Date(startDate) : new Date();
    const endDate = new Date(start);
    endDate.setDate(endDate.getDate() + plan.contractDuration);

    // Calculate interest
    const interestRate = parseFloat(plan.dailyProfit); // repurposed as total interest %
    const interestAmount = amountNum * (interestRate / 100);
    const repaymentDate = endDate;

    const investment = await prisma.investment.create({
        data: {
            userId,
            planId,
            planType: "loan",
            amount: amountNum,
            interestAmount,
            startDate: start,
            endDate,
            repaymentDate,
        },
    });

    return apiSuccess({ investmentId: investment.id }, 201, "Loan requested successfully");
});
