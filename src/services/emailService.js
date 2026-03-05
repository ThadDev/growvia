import { Resend } from "resend";
import logger from "@/utils/logger";

const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const FROM_EMAIL = "Growvia <onboarding@resend.dev>";

/**
 * Send verification email
 */
export async function sendVerificationEmail(email, token) {
    if (!resend) {
        logger.warn("Resend not configured — email not sent", { email, token });
        logger.info("Verification link", { url: `${APP_URL}/verify-email?token=${token}` });
        return;
    }

    try {
        await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: "Verify your Growvia account",
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <img src="${APP_URL}/logo.png" alt="Growvia Logo" style="height: 48px; width: auto;" />
          </div>
          <h2 style="color: #fe6c00; text-align: center;">Welcome to Growvia!</h2>
          <p>Please verify your email address by clicking the button below:</p>
          <a href="${APP_URL}/verify-email?token=${token}" 
             style="display: inline-block; background: #fe6c00; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin: 16px 0;">
            Verify Email
          </a>
          <p style="color: #666; font-size: 12px;">This link expires in 24 hours.</p>
        </div>
      `,
        });

        logger.info("Verification email sent", { email });
    } catch (error) {
        logger.error("Failed to send verification email", { email, error: error.message });
    }
}

/**
 * Send password reset OTP email
 */
export async function sendPasswordResetEmail(email, otp) {
    if (!resend) {
        logger.warn("Resend not configured — OTP not sent", { email, otp });
        return;
    }

    try {
        await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: "Growvia Password Reset OTP",
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <img src="${APP_URL}/logo.png" alt="Growvia Logo" style="height: 48px; width: auto;" />
          </div>
          <h2 style="color: #fe6c00; text-align: center;">Password Reset</h2>
          <p>Your one-time password (OTP) is:</p>
          <div style="background: #f0f0f0; padding: 16px; border-radius: 8px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; margin: 16px 0;">
            ${otp}
          </div>
          <p style="color: #666; font-size: 12px;">This code expires in 10 minutes.</p>
        </div>
      `,
        });

        logger.info("Password reset OTP sent", { email });
    } catch (error) {
        logger.error("Failed to send OTP email", { email, error: error.message });
    }
}

/**
 * Send deposit confirmation email
 */
export async function sendDepositConfirmationEmail(email, { crypto, amount }) {
    if (!resend) {
        logger.warn("Resend not configured — deposit email not sent", { email });
        return;
    }

    try {
        await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: "Growvia Deposit Proof Received",
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <img src="${APP_URL}/logo.png" alt="Growvia Logo" style="height: 48px; width: auto;" />
          </div>
          <h2 style="color: #fe6c00; text-align: center;">Deposit Proof Submitted</h2>
          <p>We received your deposit proof for <strong>${amount} ${crypto}</strong>.</p>
          <p>Our team will review and credit your account within 1-2 business days.</p>
        </div>
      `,
        });
    } catch (error) {
        logger.error("Failed to send deposit email", { email, error: error.message });
    }
}
