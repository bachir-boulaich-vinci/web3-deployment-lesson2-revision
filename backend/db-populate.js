const { PrismaClient } = require("./generated/prisma");

const prisma = new PrismaClient();

async function main() {
  const expenses = await prisma.expense.createMany({
    data: [
      {
        date: new Date("2025-01-16"),
        description: "Example expense #1 from Alice",
        payer: "Alice",
        amount: 25.5,
      },
      {
        date: new Date("2025-01-15"),
        description: "Example expense #2 from Bob",
        payer: "Bob",
        amount: 35,
      },
      {
        date: new Date("2025-01-15"),
        description: "Example expense #3 from Alice",
        payer: "Alice",
        amount: 2,
      },
    ],
    skipDuplicates: true
  });
  console.log(expenses);
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });
