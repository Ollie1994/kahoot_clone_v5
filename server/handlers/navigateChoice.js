import { roomState } from "../states/states.js";

export function navigateChoice(socket, io, { room }) {
  console.log("To scoreboard or getready");

  if (!roomState[room]) {
    console.log(`Room ${room} not found in roomState`);
    return;
  }
  const { currentQuestion, numberOfQuestions } = roomState[room];
  roomState[room].hasAdvanced = false
  if (currentQuestion >= numberOfQuestions) {

    io.to(room).emit("navigate_scoreboard");
  } else {
    io.to(room).emit("navigate_get_ready");
  }
}
