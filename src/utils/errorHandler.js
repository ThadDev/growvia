import { NextResponse } from "next/server";
import logger from "./logger";

export class AppError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
    }
}

export function apiError(message, statusCode = 400) {
    return NextResponse.json(
        { status: "error", message },
        { status: statusCode }
    );
}

export function apiSuccess(data, statusCode = 200, message = "Success") {
    return NextResponse.json(
        { status: "success", message, data },
        { status: statusCode }
    );
}

/**
 * Wraps an async route handler with automatic error catching.
 * Usage: export const POST = withErrorHandler(async (req) => { ... })
 */
export function withErrorHandler(handler) {
    return async (req, context) => {
        try {
            return await handler(req, context);
        } catch (error) {
            logger.error("API Error", {
                message: error.message,
                stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
                url: req.url,
                method: req.method,
            });

            if (error instanceof AppError) {
                return apiError(error.message, error.statusCode);
            }

            return apiError("Internal server error", 500);
        }
    };
}
