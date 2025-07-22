import { roomState } from "../states/states.js";
export function initRoomState(socket, io, { room, totalQuestions }) {
  if (!roomState[room]) {
    roomState[room] = {
      currentQuestion: 0,
      numberOfQuestions: totalQuestions,
      hasAdvanced: false,
    };
  }
  console.log("serverside-init: ", roomState[room]);
}
