import { withErrorHandler, apiSuccess, apiError } from "@/utils/errorHandler";
import { getAuthUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";

/**
 * POST /api/users/me/investments/loan/preview — Preview loan before confirming
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
    const interestRate = parseFloat(plan.dailyProfit);
    const interestAmount = amountNum * (interestRate / 100);

    const start = startDate ? new Date(startDate) : new Date();
    const end = new Date(start);
    end.setDate(end.getDate() + plan.contractDuration);

    return apiSuccess({
        planTitle: plan.title,
        preview: {
            amount: amountNum,
            interestRate,
            interestAmount: interestAmount.toFixed(2),
            duration: plan.contractDuration,
            repaymentDate: end.toISOString(),
        },
    });
});
