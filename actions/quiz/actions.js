"use server";

import { PrismaClient } from "@prisma/client";
/* import { revalidatePath } from "next/cache"; */

const prisma = new PrismaClient();

export async function createPost(data) {
  const title = data.title;
  const questions = data.questions;
  const users = data.users
  

  await prisma.quizzes.create({
    data: {
      title,
      code: Math.random().toString(36).slice(2, 7).toUpperCase(),
      users,
      questions,
    },
  });

  /*   revalidatePath("/game"); */
}
