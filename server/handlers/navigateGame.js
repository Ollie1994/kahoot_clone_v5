

export function navigateGame(socket, io, { room }) {
  console.log("Basic NAV");

  io.to(room).emit("navigate");
}
