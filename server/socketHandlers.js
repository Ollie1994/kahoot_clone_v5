import { answerQuestion } from "./handlers/answerQuestion";
import { currentQuestion } from "./handlers/currentQuestion";
import { disconnect } from "./handlers/disconnect";
import { initRoomState } from "./handlers/initRoomState";
import { joinRoom } from "./handlers/joinRoom";
import { navigateGame } from "./handlers/navigateGame";
import { nextQuestion } from "./handlers/nextQuestion";
import { startTimer } from "./handlers/startTimer";

export function handleSocketEvents(socket, io) {
  socket.on("join-room", ({ room, username }) =>
    joinRoom(socket, io, { room, username })
  );
  socket.on("navigate_game", ({ room }) => navigateGame(socket, io, { room }));
  socket.on("start-timer", () => startTimer(socket, io));
  socket.on("answer-question", ({ room, username, points }) =>
    answerQuestion(socket, io, { room, username, points })
  );
  socket.on("init_room_state", ({ room, totalQuestions }) =>
    initRoomState(socket, io, { room, totalQuestions })
  );
  socket.on("next_question", ({ room }) => nextQuestion(socket, io, { room }));
  socket.on("current_question", ({ room }) =>
    currentQuestion(socket, io, { room })
  );
  socket.on("disconnect", () => disconnect(socket, io));
}

