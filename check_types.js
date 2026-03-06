const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    const plans = await prisma.investmentPlan.findMany();
    console.log("All Plan Types:", [...new Set(plans.map(p => p.type))]);

    const products = await prisma.investmentProduct.findMany();
    console.log("All Product Types:", [...new Set(products.map(p => p.type))]);
}
check().finally(() => prisma.$disconnect());
