export const dynamic = 'force-dynamic';
import { withErrorHandler, apiSuccess, apiError } from "@/utils/errorHandler";
import { getAuthUserId } from "@/lib/auth";
import { changePasswordSchema } from "@/lib/validation";
import { changePassword } from "@/services/authService";

export const POST = withErrorHandler(async (req) => {
    const userId = await getAuthUserId();
    if (!userId) return apiError("Unauthorized", 401);

    const body = await req.json();
    const parsed = changePasswordSchema.safeParse(body);

    if (!parsed.success) {
        return apiError(parsed.error.errors[0].message, 400);
    }

    await changePassword(userId, parsed.data.currentPassword, parsed.data.newPassword);

    return apiSuccess(null, 200, "Password changed successfully");
});
