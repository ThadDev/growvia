export const dynamic = 'force-dynamic';
import { withErrorHandler, apiSuccess, apiError } from "@/utils/errorHandler";
import { getAuthUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";

/**
 * POST /api/users/kyc/resubmit — Resubmit rejected KYC
 */
export const POST = withErrorHandler(async (req) => {
    const userId = await getAuthUserId();
    if (!userId) return apiError("Unauthorized", 401);

    const existing = await prisma.kycSubmission.findUnique({ where: { userId } });
    if (!existing || existing.status !== "rejected") {
        return apiError("No rejected KYC to resubmit", 400);
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

    const idFrontUrl = idFront?.name || existing.idFront;
    const idBackUrl = idBack?.name || existing.idBack;

    await prisma.kycSubmission.update({
        where: { userId },
        data: {
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

    return apiSuccess(null, 200, "KYC resubmitted successfully");
});
