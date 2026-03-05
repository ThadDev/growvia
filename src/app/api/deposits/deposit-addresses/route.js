export const dynamic = 'force-dynamic';
import { withErrorHandler, apiSuccess, apiError } from "@/utils/errorHandler";
import { getAuthUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";

/**
 * GET /api/deposits/deposit-addresses — List all crypto deposit addresses
 */
export const GET = withErrorHandler(async () => {
    const userId = await getAuthUserId();
    if (!userId) return apiError("Unauthorized", 401);

    const addresses = await prisma.cryptoAddress.findMany({
        orderBy: { createdAt: "asc" },
    });

    return apiSuccess(addresses);
});
