export const dynamic = 'force-dynamic';
import { withErrorHandler, apiSuccess, apiError } from "@/utils/errorHandler";
import { getAuthUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";

/**
 * GET /api/investments/loan/plans — Loan plans catalog
 */
export const GET = withErrorHandler(async () => {
    const userId = await getAuthUserId();
    if (!userId) return apiError("Unauthorized", 401);

    const plans = await prisma.investmentPlan.findMany({
        where: { type: "loan", status: "active" },
        orderBy: { createdAt: "asc" },
    });

    return apiSuccess({ plans });
});
