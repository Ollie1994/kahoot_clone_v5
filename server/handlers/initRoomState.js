import { roomState } from "server/states/states";
export function initRoomState(socket, io, { room, totalQuestions }) {
  if (!roomState[room]) {
    roomState[room] = {
      currentQuestion: 0,
      numberOfQuestions: totalQuestions,
    };
  }
  console.log("serverside-init: ", roomState[room]);
  console.log("question states in all rooms:", roomState);
}
