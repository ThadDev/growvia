export const dynamic = 'force-dynamic';
import { withErrorHandler, apiSuccess, apiError } from "@/utils/errorHandler";
import { getAuthUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";

/**
 * GET /api/users/kyc — Get KYC status
 */
export const GET = withErrorHandler(async () => {
    const userId = await getAuthUserId();
    if (!userId) return apiError("Unauthorized", 401);

    const kyc = await prisma.kycSubmission.findUnique({ where: { userId } });

    if (!kyc) {
        return apiSuccess({ status: null });
    }

    return apiSuccess({
        status: kyc.status,
        rejectionReasons: kyc.rejectionReasons,
    });
});

/**
 * POST /api/users/kyc — Submit KYC
 */
export const POST = withErrorHandler(async (req) => {
    const userId = await getAuthUserId();
    if (!userId) return apiError("Unauthorized", 401);

    // Check for existing submission
    const existing = await prisma.kycSubmission.findUnique({ where: { userId } });
    if (existing && existing.status === "pending") {
        return apiError("KYC is already under review", 400);
    }
    if (existing && existing.status === "approved") {
        return apiError("KYC is already approved", 400);
    }

    const formData = await req.formData();
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const address = formData.get("address");
    const maritalStatus = formData.get("maritalStatus");
    const dob = formData.get("dob");
    const idType = formData.get("idType");
    const idNumber = formData.get("idNumber");
    const idFront = formData.get("idFront");
    const idBack = formData.get("idBack");

    if (!fullName || !email || !address || !maritalStatus || !dob || !idType || !idNumber) {
        return apiError("All fields are required", 400);
    }

    // For now, store file names. In production, upload to S3/Supabase Storage.
    const idFrontUrl = idFront?.name || "uploaded";
    const idBackUrl = idBack?.name || "uploaded";

    const kyc = await prisma.kycSubmission.upsert({
        where: { userId },
        create: {
            userId,
            fullName,
            email,
            address,
            maritalStatus,
            dob: new Date(dob),
            idType,
            idNumber,
            idFront: idFrontUrl,
            idBack: idBackUrl,
        },
        update: {
            fullName,
            email,
            address,
            maritalStatus,
            dob: new Date(dob),
            idType,
            idNumber,
            idFront: idFrontUrl,
            idBack: idBackUrl,
            status: "pending",
            rejectionReasons: null,
        },
    });

    return apiSuccess({ id: kyc.id }, 201, "KYC submitted successfully");
});
