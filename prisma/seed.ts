import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.config.create({
    data: {
      key: "maxAntrian",
      value: "12",
    },
  });
  await prisma.config.create({
    data: {
      key: "biayaPemeriksaan",
      value: "40000",
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
