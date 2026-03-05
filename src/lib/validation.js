import { z } from "zod";

// ─── AUTH ──────────────────────────────────────────────
export const signupSchema = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(6, "Invalid phone number"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain an uppercase letter")
        .regex(/[0-9]/, "Password must contain a number")
        .regex(/[^A-Za-z0-9]/, "Password must contain a special character"),
    referralCode: z.string().optional().nullable(),
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
    keepMeLoggedIn: z.boolean().optional(),
});

export const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export const verifyOtpSchema = z.object({
    email: z.string().email("Invalid email address"),
    otp: z.string().length(4, "OTP must be 4 digits"),
});

export const resetPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters"),
});

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain an uppercase letter")
        .regex(/[0-9]/, "Password must contain a number")
        .regex(/[^A-Za-z0-9]/, "Password must contain a special character"),
});

export const resendVerificationSchema = z.object({
    email: z.string().email("Invalid email address"),
});

// ─── PROFILE ───────────────────────────────────────────
export const updateProfileSchema = z.object({
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
});

// ─── WITHDRAWAL ────────────────────────────────────────
export const withdrawalSchema = z.object({
    crypto: z.string().min(1, "Cryptocurrency is required"),
    amount: z.number().positive("Amount must be positive"),
    walletAddress: z.string().min(10, "Invalid wallet address"),
});

// ─── INVESTMENT ────────────────────────────────────────
export const buyPlanSchema = z.object({
    amount: z.number().positive("Amount must be positive"),
    planId: z.string().uuid("Invalid plan ID"),
});
