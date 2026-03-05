import { withErrorHandler, apiSuccess, apiError } from "@/utils/errorHandler";
import { resetPasswordSchema } from "@/lib/validation";
import { resetPassword } from "@/services/authService";

export const POST = withErrorHandler(async (req) => {
    const body = await req.json();
    const parsed = resetPasswordSchema.safeParse(body);

    if (!parsed.success) {
        return apiError(parsed.error.errors[0].message, 400);
    }

    await resetPassword(parsed.data.email, parsed.data.password);

    return apiSuccess(null, 200, "Password has been reset successfully");
});
