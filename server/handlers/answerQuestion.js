import { roomScores } from "server/states/states";
export function answerQuestion(socket, io, { room, username, points }) {
  console.log("Serverside points:" + points);
  roomScores[room][username] += points;
}
