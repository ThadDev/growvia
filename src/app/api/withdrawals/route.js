import { withErrorHandler, apiSuccess, apiError } from "@/utils/errorHandler";
import { getAuthUserId } from "@/lib/auth";
import { withdrawalSchema } from "@/lib/validation";
import prisma from "@/lib/prisma";

/**
 * POST /api/withdrawals — Request withdrawal
 */
export const POST = withErrorHandler(async (req) => {
    const userId = await getAuthUserId();
    if (!userId) return apiError("Unauthorized", 401);

    const body = await req.json();
    const parsed = withdrawalSchema.safeParse(body);

    if (!parsed.success) {
        return apiError(parsed.error.errors[0].message, 400);
    }

    const { crypto, amount, walletAddress } = parsed.data;

    // Check idempotency
    const idemKey = req.headers.get("x-idempotency-key");
    if (idemKey) {
        const existing = await prisma.idempotencyKey.findFirst({
            where: { userId, key: idemKey, route: "withdrawals" },
        });
        if (existing) {
            return apiSuccess(null, 200, "Withdrawal already submitted");
        }
    }

    // Check balance
    const wallet = await prisma.wallet.findUnique({ where: { userId } });
    if (!wallet || parseFloat(wallet.accountBalance) < amount) {
        return apiError("Insufficient funds", 400);
    }

    const withdrawal = await prisma.withdrawal.create({
        data: {
            userId,
            crypto: crypto.toLowerCase(),
            amount,
            walletAddress,
        },
    });

    // Save idempotency key
    if (idemKey) {
        await prisma.idempotencyKey.create({
            data: { userId, key: idemKey, route: "withdrawals", responseCode: 201 },
        });
    }

    return apiSuccess({ withdrawalId: withdrawal.id }, 201, "Withdrawal request submitted");
});
