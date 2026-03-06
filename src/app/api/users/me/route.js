export const dynamic = 'force-dynamic';
import { withErrorHandler, apiSuccess, apiError } from "@/utils/errorHandler";
import { getAuthUserId } from "@/lib/auth";
import { updateProfileSchema } from "@/lib/validation";
import prisma from "@/lib/prisma";
import { distributeUserProfits } from "@/services/profitService";

/**
 * GET /api/users/me — Get authenticated user's profile
 */
export const GET = withErrorHandler(async () => {
    const userId = await getAuthUserId();
    if (!userId) return apiError("Unauthorized", 401);

    // Apply any pending investment profits before fetching profile state
    await distributeUserProfits(userId);

    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { wallet: true },
    });

    if (!user) return apiError("User not found", 404);

    return apiSuccess({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        emailVerified: user.emailVerified,
        accountStatus: user.accountStatus,
        referralCode: user.referralCode,
        referralCount: user.referralCount,
        address: user.address,
        city: user.city,
        state: user.state,
        country: user.country,
        accountBalance: user.wallet?.accountBalance ?? 0,
        availableProfit: user.wallet?.availableProfit ?? 0,
        totalProfit: user.wallet?.totalProfit ?? 0,
        totalDeposits: user.wallet?.totalDeposits ?? 0,
        totalWithdrawals: user.wallet?.totalWithdrawals ?? 0,
        totalInvestments: user.wallet?.totalInvestments ?? 0,
        createdAt: user.createdAt,
    });
});

/**
 * PATCH /api/users/me — Update user profile
 */
export const PATCH = withErrorHandler(async (req) => {
    const userId = await getAuthUserId();
    if (!userId) return apiError("Unauthorized", 401);

    const body = await req.json();
    const parsed = updateProfileSchema.safeParse(body);

    if (!parsed.success) {
        return apiError(parsed.error.errors[0].message, 400);
    }

    const updated = await prisma.user.update({
        where: { id: userId },
        data: parsed.data,
    });

    return apiSuccess({ id: updated.id }, 200, "Profile updated successfully");
});
