
import { roomState } from "../states/states.js";

export function navigateChoice(socket, io, { room }) {
  console.log("To scoreboard or getready");

 if (!roomState[room]) {
    console.log(`Room ${room} not found in roomState`);
    return
  }
  const { currentQuestion, numberOfQuestions } = roomState[room];
  console.log("in here NAV ?" + currentQuestion + " - " + numberOfQuestions);
  if (currentQuestion >= numberOfQuestions) {
    console.log("To scoreboard ?");

    io.to(room).emit("navigate_scoreboard");
  } else {
    console.log("To getready");
    // Still questions remaining — go to next question
    io.to(room).emit("navigate_get_ready");
  }
}



