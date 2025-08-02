import { quizzes } from "../states/states.js";
export function getQuiz(socket, io, { room }) {
  const quiz = quizzes[room];
  if (!quiz) return;
  io.to(room).emit("quiz_data", { data: quiz });
}
