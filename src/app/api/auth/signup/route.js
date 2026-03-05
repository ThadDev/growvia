import { withErrorHandler, apiSuccess, apiError } from "@/utils/errorHandler";
import { signupSchema } from "@/lib/validation";
import { registerUser } from "@/services/authService";
import { sendVerificationEmail } from "@/services/emailService";

export const POST = withErrorHandler(async (req) => {
    const body = await req.json();
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
        return apiError(parsed.error.errors[0].message, 400);
    }

    const { fullName, email, phoneNumber, password, referralCode } = parsed.data;

    const { user, verificationToken } = await registerUser({
        fullName,
        email: email.toLowerCase().trim(),
        phoneNumber: phoneNumber.trim(),
        password,
        referralCode,
    });

    // Send verification email (async — don't block response)
    sendVerificationEmail(email, verificationToken).catch(() => { });

    return apiSuccess(
        { userId: user.id },
        201,
        "Account created. Please check your email to verify."
    );
});
