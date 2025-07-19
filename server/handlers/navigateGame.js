export function navigateGame(socket, io, { room }) {
  io.to(room).emit("navigate_game");
}
