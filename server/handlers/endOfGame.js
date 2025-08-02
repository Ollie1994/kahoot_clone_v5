import { roomPlayers } from "../states/states.js";
import { roomTimers } from "../states/states.js";
import { roomScores } from "../states/states.js";
import { roomState } from "../states/states.js";
import { quizzes } from "../states/states.js";

export function endOfGame(socket, io, { room }) {
  if (roomPlayers[room]) {
    delete roomPlayers[room];
    console.log(roomPlayers, " --- removed user <", room, "> from list");
  }

  if (roomTimers[room]) {
    clearInterval(roomTimers[room]);
    delete roomTimers[room];
    console.log(roomTimers, " --- removed timer <", room, "> from list");
  }
  if (roomScores[room]) {
    delete roomScores[room];
    console.log(roomScores, " --- removed scores <", room, "> from list");
  }
  if (roomState[room]) {
    delete roomState[room];
    console.log(roomState, " --- removed state <", room, "> from list");
  }
  if (quizzes[room]) {
    delete quizzes[room];
    console.log(quizzes, " --- removed quiz <", room, "> from list");
  }

  io.to(room).emit("navigate_home");
}
