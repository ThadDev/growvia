export const dynamic = 'force-dynamic';
import { withErrorHandler, apiSuccess, apiError } from "@/utils/errorHandler";
import { resendVerificationSchema } from "@/lib/validation";
import { resendVerification } from "@/services/authService";
import { sendVerificationEmail } from "@/services/emailService";

export const POST = withErrorHandler(async (req) => {
    const body = await req.json();
    const parsed = resendVerificationSchema.safeParse(body);

    if (!parsed.success) {
        return apiError(parsed.error.errors[0].message, 400);
    }

    const { token, user } = await resendVerification(parsed.data.email);

    sendVerificationEmail(user.email, token).catch(() => { });

    return apiSuccess(null, 200, "Verification email sent");
});
