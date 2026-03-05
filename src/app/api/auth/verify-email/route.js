export const dynamic = 'force-dynamic';
import { withErrorHandler, apiSuccess, apiError } from "@/utils/errorHandler";
import { verifyEmail } from "@/services/authService";

export const GET = withErrorHandler(async (req) => {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
        return apiError("Missing verification token", 400);
    }

    await verifyEmail(token);

    return apiSuccess(null, 200, "Email verified successfully");
});
