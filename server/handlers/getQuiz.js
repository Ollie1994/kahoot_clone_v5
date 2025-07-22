import { quizzes } from "../states/states.js";
export function getQuiz(socket, io, { room }) {
  const quiz = quizzes[room];
  console.log("[SOCKET] quizzes at getQuiz------------->:", quizzes);
  console.log("SERVER quiz - ", quiz, " ------>--->--->----->--->---->------");
  if (!quiz) return;
  io.to(room).emit("quiz_data", { data: quiz });
}
