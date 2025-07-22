import { quizzes } from "../states/states.js";

export function setQuiz(socket, io, { room, quiz }) {
  quizzes[room] = quiz;
  console.log("Quiz stored on server for room:", room);
}