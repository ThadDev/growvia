export const dynamic = 'force-dynamic';
import { withErrorHandler, apiSuccess, apiError } from "@/utils/errorHandler";
import { getAuthUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";

/**
 * GET /api/investments/stock-bond/plans — Stock & Bond investment plans
 */
export const GET = withErrorHandler(async () => {
    const userId = await getAuthUserId();
    if (!userId) return apiError("Unauthorized", 401);

    const plans = await prisma.investmentPlan.findMany({
        where: { type: "stockBond", status: "active" },
        orderBy: { minDeposit: "asc" },
    });

    return apiSuccess({ plans });
});
