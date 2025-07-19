import { roomScores } from "server/states/states";
export function playerScores(socket, io, { room }) {
  io.to(room).emit("score-update", { updatedScores: roomScores[room] });
}
