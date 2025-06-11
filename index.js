import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.users.create({
    data: {
      username: "Tina",
      password: "Password_1",
    },
  });

  const users = await prisma.users.findMany();
  console.log(users);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
