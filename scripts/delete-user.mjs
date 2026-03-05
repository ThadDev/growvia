import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function deleteUser(email) {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            console.log(`User with email ${email} not found.`);
            return;
        }

        console.log(`Found user: ${user.fullName} (${user.id}). Deleting...`);

        // The Prisma schema has onDelete: Cascade for related records linked to User.id
        await prisma.user.delete({
            where: { id: user.id },
        });

        console.log(`Successfully deleted user ${email} and all related data.`);
    } catch (error) {
        console.error("Error deleting user:", error);
    } finally {
        await prisma.$disconnect();
    }
}

const emailToDelete = "nodfinance@gmail.com";
deleteUser(emailToDelete);
