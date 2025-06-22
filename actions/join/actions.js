"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addPlayerToQuiz(data) {
  const code = data.code;
  const username = data.username;
  const newUser = {
    id: 2,
    role: "PLAYER",
    username: username,
    score: 0,
  };

  await prisma.quizzes.update({
    where: {
      code: code,
    },
    data: {
      users: {
        push: newUser,
      },
    },
  });
}
