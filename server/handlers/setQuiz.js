import { quizzes } from "../states/states.js";

export function setQuiz(socket, io, { room, quiz }) {
  quizzes[room] = quiz;
}