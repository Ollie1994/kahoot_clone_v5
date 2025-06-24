import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { code } = await params;

  const quiz = await prisma.quizzes.findUnique({
    where: { code },
    select: {
      users: true,
    },
  });

  if (!quiz) {
    return new Response(JSON.stringify({ error: "Quiz not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(quiz.users), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
