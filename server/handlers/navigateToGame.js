export function navigateToGame(socket, io, { room }) {
  console.log("NAV GAME TO GAME ONLY");

  io.to(room).emit("navigate_to_game");
}
