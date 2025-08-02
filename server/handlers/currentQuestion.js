import { roomState } from "../states/states.js"
export function currentQuestion(socket, io, { room }) {
  io.to(room).emit("current_question_state", roomState[room]);
  console.log("serverside-current: ", roomState[room]);
}
