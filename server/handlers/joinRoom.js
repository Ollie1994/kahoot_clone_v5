import { roomPlayers } from "../states/states.js"
import { roomScores } from "../states/states.js"

export function joinRoom(socket, io, { room, username }) {
    socket.join(room);
      // store data
      socket.data.room = room;
      socket.data.username = username;
      // Add player to room memory
      if (!roomPlayers[room]) {
        roomPlayers[room] = [];
      }
      // Prevent duplicates (in case of reconnect)
      if (!roomPlayers[room].includes(username)) {
        roomPlayers[room].push(username);
      }
      // Initialize score
      if (!roomScores[room]) roomScores[room] = {};
      if (!roomScores[room][username]) roomScores[room][username] = 0;

      io.to(room).emit("players_list", roomPlayers[room]);
      console.log(`User ${username} joined room ${room}`);
      console.log("Users in all rooms:", roomPlayers);
}