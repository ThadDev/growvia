import { withErrorHandler, apiSuccess } from "@/utils/errorHandler";
import { logoutUser } from "@/services/authService";

export const POST = withErrorHandler(async () => {
    await logoutUser();
    return apiSuccess(null, 200, "Logged out successfully");
});
