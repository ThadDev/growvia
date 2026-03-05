import { withErrorHandler, apiSuccess, apiError } from "@/utils/errorHandler";
import { getAuthUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { sendDepositConfirmationEmail } from "@/services/emailService";

/**
 * POST /api/deposits — Submit deposit proof (multipart form)
 */
export const POST = withErrorHandler(async (req) => {
    const userId = await getAuthUserId();
    if (!userId) return apiError("Unauthorized", 401);

    const formData = await req.formData();
    const crypto = formData.get("crypto");
    const amount = formData.get("amount");
    const proofFile = formData.get("proofOfPayment");

    if (!crypto || !amount || !proofFile) {
        return apiError("Crypto, amount, and proof of payment are required", 400);
    }

    const amountNum = Number(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
        return apiError("Invalid amount", 400);
    }

    // Store proof file name. In production, upload to cloud storage.
    const proofUrl = proofFile?.name || "uploaded";

    const deposit = await prisma.deposit.create({
        data: {
            userId,
            crypto: String(crypto),
            amount: amountNum,
            proofOfPayment: proofUrl,
        },
    });

    // Send confirmation email
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user) {
        sendDepositConfirmationEmail(user.email, { crypto, amount: amountNum }).catch(() => { });
    }

    return apiSuccess({ depositId: deposit.id }, 201, "Deposit proof submitted successfully");
});
