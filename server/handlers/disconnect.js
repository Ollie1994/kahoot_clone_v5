import { roomPlayers } from "../states/states.js"
export function disconnect(socket, io) {
  const room = socket.data.room;
  const username = socket.data.username;

  if (room && username && roomPlayers[room]) {
    // Remove the user from the room player list
    roomPlayers[room] = roomPlayers[room].filter((u) => u !== username);

    // Emit the updated player list
    io.to(room).emit("players_list", roomPlayers[room]);

    console.log(`User ${username} disconnected from room ${room}`);
  }
}
