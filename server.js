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
      io.to(room).emit("players_list", roomPlayers[room]);
      console.log(`User ${username} joined room ${room}`);
      console.log("Users in all rooms:", roomPlayers);
    });
   /*  io.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    }); */
    // ------------------- test grejer ---------------------------
    socket.on("ready", () => {
      // Send message to everyone
      io.emit("message", "Everyone gets this because client said ready!!!!");
      // --------------------------------------------------------
    });

    // Handle disconnect
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
