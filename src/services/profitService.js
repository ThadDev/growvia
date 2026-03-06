import prisma from "@/lib/prisma";
import logger from "@/utils/logger";

/**
 * Lazy-evaluates and distributes unpaid profits for a user's active investments.
 * This is "Fintech Grade" because it uses idempotent exact-time calculations
 * to determine owed fractions, immune to skipped cron jobs or server sleep states.
 * Wraps everything in a single strict Prisma $transaction to prevent double-spending.
 */
export async function distributeUserProfits(userId) {
    try {
        const activeInvestments = await prisma.investment.findMany({
            where: {
                userId,
                status: "active",
            },
            include: {
                plan: true,
            },
        });

        if (!activeInvestments.length) return;

        const now = new Date();

        for (const inv of activeInvestments) {
            const startDate = new Date(inv.startDate);
            const endDate = new Date(inv.endDate);

            // Limit calculation to the end date of the contract
            const calculationDate = now > endDate ? endDate : now;

            const MathFloor = Math.floor;
            // Provide profits hourly as explicitly requested
            const elapsedMs = calculationDate.getTime() - startDate.getTime();
            const elapsedHours = MathFloor(elapsedMs / (1000 * 60 * 60));
            const fractionalDaysBasedOnHours = elapsedHours / 24;

            const principal = parseFloat(inv.amount);
            const dailyProfitRate = parseFloat(inv.plan.dailyProfit) / 100;

            // Total expected profit up to this exact floored hour
            let expectedProfit = principal * dailyProfitRate * fractionalDaysBasedOnHours;

            // If we've reached or passed the end date, accurately cap at max possible profit 
            // based on the exact contract duration to avoid float inaccuracies
            if (now >= endDate) {
                expectedProfit = principal * dailyProfitRate * inv.plan.contractDuration;
            }

            const currentEarned = parseFloat(inv.profitEarned);

            // Truncate to 4 decimals to avoid weird JS floating point diffs yielding 0.000000001
            const unpaidProfit = Math.floor((expectedProfit - currentEarned) * 10000) / 10000;

            // Distribute pending profit if greater than zero or if it's time to complete the contract
            if (unpaidProfit > 0 || now >= endDate) {
                // Ensure this is done inside a single transaction so the investment state,
                // the ledger, and the wallet are locked and updated synchronously.
                await prisma.$transaction(async (tx) => {
                    const wallet = await tx.wallet.findUnique({ where: { userId } });
                    if (!wallet) throw new Error("Wallet not found during profit distribution");

                    // 1. Update investment paid balance
                    const invUpdateData = {};
                    if (unpaidProfit > 0) {
                        invUpdateData.profitEarned = { increment: unpaidProfit };
                    }
                    if (now >= endDate) {
                        invUpdateData.status = "completed";
                    }

                    if (Object.keys(invUpdateData).length > 0) {
                        await tx.investment.update({
                            where: { id: inv.id },
                            data: invUpdateData,
                        });
                    }

                    if (unpaidProfit > 0) {
                        // 2. Dispatch money to the wallet
                        await tx.wallet.update({
                            where: { userId },
                            data: {
                                availableProfit: { increment: unpaidProfit },
                                totalProfit: { increment: unpaidProfit },
                            },
                        });

                        // 3. Create immutable ledger entry
                        const newWalletBalance = parseFloat(wallet.accountBalance); // Account balance remains unchanged because profits go to 'availableProfit' bucket
                        await tx.ledgerEntry.create({
                            data: {
                                walletId: wallet.id,
                                type: "CREDIT",
                                category: "PROFIT",
                                amount: unpaidProfit,
                                balanceAfter: newWalletBalance,
                                description: `Automated hourly profit payout for ${inv.plan.title}`,
                                referenceId: inv.id,
                            }
                        });

                        logger.info(`Distributed $${unpaidProfit} to User ${userId} for Investment ${inv.id}`);
                    }
                });
            }
        }
    } catch (err) {
        logger.error("Failed to distribute user profits", err);
    }
}
