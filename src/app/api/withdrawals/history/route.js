import { withErrorHandler, apiSuccess, apiError } from "@/utils/errorHandler";
import { getAuthUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";

/**
 * GET /api/withdrawals/history — User's withdrawal history
 */
export const GET = withErrorHandler(async () => {
    const userId = await getAuthUserId();
    if (!userId) return apiError("Unauthorized", 401);

    const withdrawals = await prisma.withdrawal.findMany({
        where: { userId },
        orderBy: { requestedAt: "desc" },
    });

    return apiSuccess({ withdrawals });
});
