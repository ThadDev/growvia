import { withErrorHandler, apiSuccess, apiError } from "@/utils/errorHandler";
import { getAuthUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";

/**
 * GET /api/deposits/deposit-address?crypto=BTC — Get single deposit address
 */
export const GET = withErrorHandler(async (req) => {
    const userId = await getAuthUserId();
    if (!userId) return apiError("Unauthorized", 401);

    const { searchParams } = new URL(req.url);
    const crypto = searchParams.get("crypto");

    if (!crypto) return apiError("Crypto parameter is required", 400);

    const address = await prisma.cryptoAddress.findUnique({
        where: { crypto: crypto.toUpperCase() },
    });

    if (!address) return apiError("Crypto address not found", 404);

    return apiSuccess({
        crypto: address.crypto,
        network: address.network,
        address: address.address,
    });
});
