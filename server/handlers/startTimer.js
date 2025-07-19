import { roomTimers } from "server/states/states";

export function startTimer(socket, io) {
  const room = socket.data.room;
  const username = socket.data.username;
  if (!room) return;
  if (roomTimers[room]) return;
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
}
