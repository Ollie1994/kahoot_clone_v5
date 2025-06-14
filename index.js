// fungerar som ett test för att påvisa att prisma fungerar 

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.users.create({
    data: {
      username: "Glenn",
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
