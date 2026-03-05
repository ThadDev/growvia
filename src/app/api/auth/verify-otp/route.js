import { withErrorHandler, apiSuccess, apiError } from "@/utils/errorHandler";
import { verifyOtpSchema } from "@/lib/validation";
import { verifyOtp } from "@/services/authService";

export const POST = withErrorHandler(async (req) => {
    const body = await req.json();
    const parsed = verifyOtpSchema.safeParse(body);

    if (!parsed.success) {
        return apiError(parsed.error.errors[0].message, 400);
    }

    await verifyOtp(parsed.data.email, parsed.data.otp);

    return apiSuccess(null, 200, "OTP verified");
});
