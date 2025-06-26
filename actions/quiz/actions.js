"use server";

import { PrismaClient } from "@prisma/client";
/* import { revalidatePath } from "next/cache"; */

const prisma = new PrismaClient();

export async function createQuiz(data) {
  const title = data.title;
  const questions = data.questions;
  const users = data.users;
  const code = Math.random().toString(36).slice(2, 7).toUpperCase()

  await prisma.quizzes.create({
    data: {
      title,
      code: code,
      users,
      questions,
    },
  });
  return code;
  /*   revalidatePath("/game"); */
}
