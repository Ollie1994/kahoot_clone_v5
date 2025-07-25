import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getQuizByCode(code) {
    
  const quiz = await prisma.quizzes.findUnique({
    where: { code },
  });

  if (!quiz) {
    throw new Error("Quiz not found");
  }

  return quiz;
}