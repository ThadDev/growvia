import { withErrorHandler, apiSuccess, apiError } from "@/utils/errorHandler";
import { forgotPasswordSchema } from "@/lib/validation";
import { forgotPassword } from "@/services/authService";
import { sendPasswordResetEmail } from "@/services/emailService";

export const POST = withErrorHandler(async (req) => {
    const body = await req.json();
    const parsed = forgotPasswordSchema.safeParse(body);

    if (!parsed.success) {
        return apiError(parsed.error.errors[0].message, 400);
    }

    const { otp, user } = await forgotPassword(parsed.data.email);

    if (otp && user) {
        sendPasswordResetEmail(user.email, otp).catch(() => { });
    }

    // Always return success to not reveal user existence
    return apiSuccess(null, 200, "If an account exists, an OTP has been sent");
});
