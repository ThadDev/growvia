import { withErrorHandler, apiSuccess, apiError } from "@/utils/errorHandler";
import { getAuthUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";

/**
 * GET /api/deposits/history — User's deposit history
 */
export const GET = withErrorHandler(async () => {
    const userId = await getAuthUserId();
    if (!userId) return apiError("Unauthorized", 401);

    const deposits = await prisma.deposit.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });

    return apiSuccess({ data: deposits });
});
