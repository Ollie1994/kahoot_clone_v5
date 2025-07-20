import { roomTimers } from "../states/states.js";
import { navigateGame } from "./navigateGame.js";

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
      console.log("before time to nav ???");
      io.to(room).emit("time_to_nav");
    }
  }, 1000);
}
