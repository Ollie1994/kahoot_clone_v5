import { roomScores } from "../states/states.js";
export function playerScores(socket, io, { room }) {
  console.log("SERVERSIDE - currentRoomScores - ", roomScores[room])
  io.to(room).emit("score-update", { updatedScores: roomScores[room] });
}
