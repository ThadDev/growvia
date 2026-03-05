// Validates that all required environment variables are present at startup.

const required = ["DATABASE_URL", "JWT_SECRET"];

const optional = ["RESEND_API_KEY", "NEXT_PUBLIC_APP_URL"];

export function validateEnv() {
    const missing = required.filter((key) => !process.env[key]);
    if (missing.length > 0) {
        throw new Error(
            `Missing required environment variables: ${missing.join(", ")}`
        );
    }

    const warnings = optional.filter((key) => !process.env[key]);
    if (warnings.length > 0) {
        console.warn(
            `[env] Optional env vars not set: ${warnings.join(", ")}. Some features may be disabled.`
        );
    }
}

validateEnv();
