import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { socketHandlers } from "./socketHandlers";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handle);
  const io = new Server(httpServer);

  // connection
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // sends the socket and io to the socket handler
    socketHandlers(socket, io);
  });

  httpServer.listen(port, () => {
    console.log(`Server running on http://${hostname}:${port}`);
  });
});
