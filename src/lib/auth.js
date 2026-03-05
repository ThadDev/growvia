import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_NAME = "growvia_token";
const TOKEN_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

// ─── PASSWORD ──────────────────────────────────────────
export async function hashPassword(plain) {
    return bcrypt.hash(plain, 12);
}

export async function verifyPassword(plain, hash) {
    return bcrypt.compare(plain, hash);
}

// ─── JWT ───────────────────────────────────────────────
export function signToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_MAX_AGE });
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch {
        return null;
    }
}

// ─── COOKIES ───────────────────────────────────────────
export async function setAuthCookie(userId) {
    const token = signToken({ userId });
    const cookieStore = await cookies();
    cookieStore.set(TOKEN_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: TOKEN_MAX_AGE,
        path: "/",
    });
    return token;
}

export async function clearAuthCookie() {
    const cookieStore = await cookies();
    cookieStore.set(TOKEN_NAME, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0,
        path: "/",
    });
}

export async function getAuthUserId() {
    const cookieStore = await cookies();
    const token = cookieStore.get(TOKEN_NAME)?.value;
    if (!token) return null;
    const decoded = verifyToken(token);
    return decoded?.userId ?? null;
}
