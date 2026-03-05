import { withErrorHandler, apiSuccess, apiError } from "@/utils/errorHandler";
import { getAuthUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";

/**
 * GET /api/users/me/investments — List user's investment contracts
 */
export const GET = withErrorHandler(async () => {
    const userId = await getAuthUserId();
    if (!userId) return apiError("Unauthorized", 401);

    const investments = await prisma.investment.findMany({
        where: { userId },
        include: { plan: true },
        orderBy: { createdAt: "desc" },
    });

    return apiSuccess({ investments });
});
