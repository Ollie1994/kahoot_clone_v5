import { answerQuestion } from "./handlers/answerQuestion.js";
import { currentQuestion } from "./handlers/currentQuestion.js";
import { disconnect } from "./handlers/disconnect.js";
import { getQuiz } from "./handlers/getQuiz.js";
import { initRoomState } from "./handlers/initRoomState.js";
import { joinRoom } from "./handlers/joinRoom.js";
import { navigateChoice } from "./handlers/navigateChoice.js";
import { navigateGame } from "./handlers/navigateGame.js";
import { navigateToGame } from "./handlers/navigateToGame.js";
import { nextQuestion } from "./handlers/nextQuestion.js";
import { playerScores } from "./handlers/playerScores.js";
import { setQuiz } from "./handlers/setQuiz.js";
import { startTimer } from "./handlers/startTimer.js";

export function socketHandler(socket, io) {
  socket.on("join_room", ({ room, username }) =>
    joinRoom(socket, io, { room, username })
  );
  socket.on("navigate_game", ({ room }) => navigateGame(socket, io, { room }));
  socket.on("navigate_choice", ({ room }) =>
    navigateChoice(socket, io, { room })
  );
  socket.on("start_timer", () => startTimer(socket, io));
  socket.on("answer_question", ({ room, username, points }) =>
    answerQuestion(socket, io, { room, username, points })
  );
  socket.on("init_room_state", ({ room, totalQuestions }) =>
    initRoomState(socket, io, { room, totalQuestions })
  );
  socket.on("next_question", ({ room }) => nextQuestion(socket, io, { room }));
  socket.on("current_question", ({ room }) =>
    currentQuestion(socket, io, { room })
  );
  socket.on("player_scores", ({ room }) => playerScores(socket, io, { room }));
  socket.on("disconnect", () => disconnect(socket, io));
  socket.on("navigate_to_game", ({ room }) =>
    navigateToGame(socket, io, { room })
  );
   socket.on("set_quiz", ({ room, quiz }) => setQuiz(socket, io, { room, quiz }));
  socket.on("get_quiz", ({ room }) => getQuiz(socket, io, { room }));
}
