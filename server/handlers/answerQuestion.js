import { roomScores } from "../states/states.js"

export function answerQuestion(socket, io, { room, username, points }) {
  console.log("User <" + username + "> got <" + points + "> this round");
  roomScores[room][username] += points;
}
