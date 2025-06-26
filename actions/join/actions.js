"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function addPlayerToQuiz(data) {
  const code = data.code;
  const username = data.username;

  const res = await fetch(`http://localhost:3000/api/join/${code}`);
  const users = await res.json();

  const maxId = users.reduce((max, user) => Math.max(max, user.id), 0);
  const newUser = {
    id: maxId + 1,
    role: "PLAYER",
    username: username,
    score: 0,
  };

  const usernameExists = users.some(
    (user) => user.username === newUser.username
  );

  if (usernameExists) {
    return false;
  }

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
  return true;
}
