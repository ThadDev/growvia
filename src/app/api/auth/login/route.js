export const dynamic = 'force-dynamic';
import { withErrorHandler, apiSuccess, apiError } from "@/utils/errorHandler";
import { loginSchema } from "@/lib/validation";
import { loginUser } from "@/services/authService";

export const POST = withErrorHandler(async (req) => {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
        return apiError(parsed.error.errors[0].message, 400);
    }

    const { email, password } = parsed.data;

    const { user } = await loginUser({
        email: email.toLowerCase().trim(),
        password,
    });

    return apiSuccess({
        userId: user.id,
        fullName: user.fullName,
        email: user.email,
    });
});
