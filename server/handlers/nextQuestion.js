import { roomState } from "../states/states.js"
export function nextQuestion(socket, io, { room }) {
  if (roomState[room]) {
    roomState[room].currentQuestion++;
  }
  console.log("serverside - next: ", roomState[room]);
  console.log("question states in all rooms:", roomState);
}
