import prisma from "@/lib/prisma";
import logger from "@/utils/logger";
import { AppError } from "@/utils/errorHandler";

/**
 * Credit a user's wallet (deposits, refunds, profits, referral bonuses).
 * Uses Prisma interactive transactions with row-level locking.
 */
export async function creditWallet(userId, { amount, category, description, referenceId }) {
    return prisma.$transaction(async (tx) => {
        // Lock the wallet row
        const wallet = await tx.wallet.findUnique({ where: { userId } });
        if (!wallet) throw new AppError("Wallet not found", 404);

        const amountDecimal = parseFloat(amount);
        const newBalance = parseFloat(wallet.accountBalance) + amountDecimal;

        // Update wallet balances
        const updateData = {
            accountBalance: { increment: amountDecimal },
        };

        if (category === "DEPOSIT") {
            updateData.totalDeposits = { increment: amountDecimal };
        } else if (category === "PROFIT") {
            updateData.availableProfit = { increment: amountDecimal };
            updateData.totalProfit = { increment: amountDecimal };
        } else if (category === "REFERRAL_BONUS") {
            updateData.accountBalance = { increment: amountDecimal };
        }

        await tx.wallet.update({
            where: { userId },
            data: updateData,
        });

        // Create ledger entry
        const entry = await tx.ledgerEntry.create({
            data: {
                walletId: wallet.id,
                type: "CREDIT",
                category,
                amount: amountDecimal,
                balanceAfter: newBalance,
                description,
                referenceId,
            },
        });

        logger.info("Wallet credited", { userId, amount: amountDecimal, category });

        return entry;
    });
}

/**
 * Debit a user's wallet (withdrawals, investments).
 * Uses Prisma interactive transactions with row-level locking.
 */
export async function debitWallet(userId, { amount, category, description, referenceId }) {
    return prisma.$transaction(async (tx) => {
        const wallet = await tx.wallet.findUnique({ where: { userId } });
        if (!wallet) throw new AppError("Wallet not found", 404);

        const amountDecimal = parseFloat(amount);
        const currentBalance = parseFloat(wallet.accountBalance);

        if (currentBalance < amountDecimal) {
            throw new AppError("Insufficient funds", 400);
        }

        const newBalance = currentBalance - amountDecimal;

        const updateData = {
            accountBalance: { decrement: amountDecimal },
        };

        if (category === "WITHDRAWAL") {
            updateData.totalWithdrawals = { increment: amountDecimal };
        } else if (category === "INVESTMENT") {
            updateData.totalInvestments = { increment: amountDecimal };
        }

        await tx.wallet.update({
            where: { userId },
            data: updateData,
        });

        const entry = await tx.ledgerEntry.create({
            data: {
                walletId: wallet.id,
                type: "DEBIT",
                category,
                amount: amountDecimal,
                balanceAfter: newBalance,
                description,
                referenceId,
            },
        });

        logger.info("Wallet debited", { userId, amount: amountDecimal, category });

        return entry;
    });
}

/**
 * Get wallet stats for dashboard
 */
export async function getWalletStats(userId) {
    const wallet = await prisma.wallet.findUnique({ where: { userId } });
    if (!wallet) throw new AppError("Wallet not found", 404);
    return wallet;
}
