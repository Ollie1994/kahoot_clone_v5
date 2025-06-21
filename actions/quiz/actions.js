"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function createPost(formData) {
  const title = formData.get("title");
  const code = "a1b2c3";
  const isLive = null
  const createdAt = ""
  const players = []
  const questions = formData.get("questions")

  await prisma.post.create({
    data: {
      title,
      code,
      isLive,
      createdAt,
      players,
      questions
    },
  });

  revalidatePath("/game");
}
