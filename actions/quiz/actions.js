"use server";

import { PrismaClient } from "@prisma/client";
/* import { revalidatePath } from "next/cache"; */

const prisma = new PrismaClient();

export async function createPost(data) {
  const title = data.title
  const questions = data.questions

  await prisma.quizzes.create({
    data: {
      title,
      code: "a1b2c3",
      players: [],
      questions
    },
  });

  /*   revalidatePath("/game"); */
}
