import { withErrorHandler, apiSuccess, apiError } from "@/utils/errorHandler";
import { getAuthUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";

/**
 * GET /api/users/dashboard-stats
 */
export const GET = withErrorHandler(async () => {
    const userId = await getAuthUserId();
    if (!userId) return apiError("Unauthorized", 401);

    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { wallet: true },
    });

    if (!user) return apiError("User not found", 404);

    return apiSuccess({
        fullName: user.fullName,
        referralCode: user.referralCode,
        userDeposit: user.wallet?.accountBalance ?? 0,
        availableProfit: user.wallet?.availableProfit ?? 0,
        totalWithdrawalAmount: user.wallet?.totalWithdrawals ?? 0,
        totalInvestmentAmount: user.wallet?.totalInvestments ?? 0,
    });
});
