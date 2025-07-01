import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handle);
  const io = new Server(httpServer);
  const roomPlayers = {};
  const roomTimers = {};
  const roomScores = {};

  // connection
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on("join-room", ({ room, username }) => {
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
    });
    // ---------------------- För att navigare alla till /game ------------------------------
    socket.on("navigate_game", ({ room }) => {
      io.to(room).emit("navigate_game");
    });

    // -------------------------------- COUNTER --------------------------------------
    socket.on("start-timer", () => {
      const room = socket.data.room;
      const username = socket.data.username;
      if (!room) return;
      if (roomTimers[room]) return; // ✅ Prevent multiple timers in same room
      let countdown = 10;

      roomTimers[room] = setInterval(() => {
        io.to(room).emit("timer", { countdown });
        countdown--;

        if (countdown < 0) {
          clearInterval(roomTimers[room]);
          delete roomTimers[room];
          if (username === "Host") {
            io.to(room).emit("navigate_game");
          }
        }
      }, 1000);
    });
    // ---------------------------- Handle answers ---------------------------------------
    socket.on("answer-question", ({ room, username, points }) => {
      console.log("Serverside points:" + points)
      roomScores[room][username] += points; // or whatever your score rule is
    });
    //----------------- Optionally emit updated scores to all players
    socket.on("player-scores", ({ room }) => {
      io.to(room).emit("score-update", {updatedScores: roomScores[room]});
    });
    // Handle disconnect ---------------------------------------------------
    socket.on("disconnect", () => {
      const room = socket.data.room;
      const username = socket.data.username;

      if (room && username && roomPlayers[room]) {
        // Remove the user from the room player list
        roomPlayers[room] = roomPlayers[room].filter((u) => u !== username);

        // Emit the updated player list
        io.to(room).emit("players_list", roomPlayers[room]);

        console.log(`User ${username} disconnected from room ${room}`);
      }
    });
  });

  httpServer.listen(port, () => {
    console.log(`Server running on http://${hostname}:${port}`);
  });
});

// -------------- Allt över är det mest basic ----------------------------------------
