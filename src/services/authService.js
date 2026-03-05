import prisma from "@/lib/prisma";
import { hashPassword, verifyPassword, setAuthCookie, clearAuthCookie } from "@/lib/auth";
import { v4 as uuidv4 } from "uuid";
import logger from "@/utils/logger";
import { AppError } from "@/utils/errorHandler";

/**
 * Register a new user, create wallet, and generate email verification token.
 */
export async function registerUser({ fullName, email, phoneNumber, password, referralCode }) {
    // Check for existing user
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new AppError("An account with this email already exists", 409);
    }

    const hashedPassword = await hashPassword(password);
    const userReferralCode = uuidv4().slice(0, 8).toUpperCase();

    // Handle referral
    let referredByUser = null;
    if (referralCode) {
        referredByUser = await prisma.user.findUnique({
            where: { referralCode },
        });
    }

    // Create user + wallet in a transaction
    const user = await prisma.$transaction(async (tx) => {
        const newUser = await tx.user.create({
            data: {
                fullName,
                email,
                phoneNumber,
                password: hashedPassword,
                referralCode: userReferralCode,
                referredBy: referredByUser?.id || null,
            },
        });

        // Create wallet
        await tx.wallet.create({
            data: { userId: newUser.id },
        });

        // Increment referrer count
        if (referredByUser) {
            await tx.user.update({
                where: { id: referredByUser.id },
                data: { referralCount: { increment: 1 } },
            });
        }

        return newUser;
    });

    // Create email verification token
    const token = uuidv4();
    await prisma.emailVerification.create({
        data: {
            userId: user.id,
            token,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        },
    });

    logger.info("User registered", { userId: user.id, email });

    return { user, verificationToken: token };
}

/**
 * Login user — verify credentials and set cookie
 */
export async function loginUser({ email, password }) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }

    if (!user.emailVerified) {
        throw new AppError("Please verify your email before logging in", 403);
    }

    const valid = await verifyPassword(password, user.password);
    if (!valid) {
        throw new AppError("Invalid email or password", 401);
    }

    const token = await setAuthCookie(user.id);

    logger.info("User logged in", { userId: user.id });

    return { user, token };
}

/**
 * Logout — clear cookie
 */
export async function logoutUser() {
    await clearAuthCookie();
}

/**
 * Verify email by token
 */
export async function verifyEmail(token) {
    const record = await prisma.emailVerification.findUnique({ where: { token } });
    if (!record) {
        throw new AppError("Invalid or expired verification link", 400);
    }

    if (record.expiresAt < new Date()) {
        throw new AppError("Verification link has expired", 400);
    }

    await prisma.user.update({
        where: { id: record.userId },
        data: { emailVerified: true },
    });

    await prisma.emailVerification.delete({ where: { id: record.id } });

    logger.info("Email verified", { userId: record.userId });

    return true;
}

/**
 * Resend verification email
 */
export async function resendVerification(email) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new AppError("No account found with this email", 404);
    }

    if (user.emailVerified) {
        throw new AppError("Email is already verified", 400);
    }

    // Delete old tokens
    await prisma.emailVerification.deleteMany({ where: { userId: user.id } });

    const token = uuidv4();
    await prisma.emailVerification.create({
        data: {
            userId: user.id,
            token,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
    });

    logger.info("Verification email resent", { userId: user.id });

    return { token, user };
}

/**
 * Forgot password — generate OTP
 */
export async function forgotPassword(email) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        // Don't reveal user existence
        return { otp: null };
    }

    // Delete old OTPs
    await prisma.passwordReset.deleteMany({ where: { userId: user.id } });

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    await prisma.passwordReset.create({
        data: {
            userId: user.id,
            otp,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
        },
    });

    logger.info("Password reset OTP generated", { userId: user.id });

    return { otp, user };
}

/**
 * Verify OTP
 */
export async function verifyOtp(email, otp) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new AppError("Invalid request", 400);

    const record = await prisma.passwordReset.findFirst({
        where: { userId: user.id, otp, used: false },
        orderBy: { createdAt: "desc" },
    });

    if (!record) throw new AppError("Invalid OTP", 400);
    if (record.expiresAt < new Date()) throw new AppError("OTP has expired", 400);

    // Mark as used
    await prisma.passwordReset.update({
        where: { id: record.id },
        data: { used: true },
    });

    return true;
}

/**
 * Reset password
 */
export async function resetPassword(email, newPassword) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new AppError("Invalid request", 400);

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
    });

    // Cleanup any remaining password reset tokens
    await prisma.passwordReset.deleteMany({ where: { userId: user.id } });

    logger.info("Password reset completed", { userId: user.id });

    return true;
}

/**
 * Change password (authenticated)
 */
export async function changePassword(userId, currentPassword, newPassword) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new AppError("User not found", 404);

    const valid = await verifyPassword(currentPassword, user.password);
    if (!valid) throw new AppError("Current password is incorrect", 401);

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
    });

    logger.info("Password changed", { userId });

    return true;
}
