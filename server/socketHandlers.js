import { joinRoom } from "./handlers/joinRoom"


export function handleSocketEvents(socket, io) {
  socket.on("join-room", ({room, username}) => joinRoom(socket, io, {room, username}));
}

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 // all under gammalt och ska delas upp
 
    socket.on("join-room", ({ room, username }) => {
  
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
      console.log("Serverside points:" + points);
      roomScores[room][username] += points; // or whatever your score rule is
    });
    // -------- ------------- Handle questions ----------------------------------------------
    // Initialize questions
    socket.on("init_room_state", ({ room, totalQuestions }) => {
      if (!roomState[room]) {
        roomState[room] = {
          currentQuestion: 0,
          numberOfQuestions: totalQuestions,
        };
      }
      console.log("serverside-init: ", roomState[room]);
      console.log("question states in all rooms:", roomState);
    });
    // advances the Q state before each upcoming Q
    socket.on("next_question", ({ room }) => {
      if (roomState[room]) {
        roomState[room].currentQuestion++;
      }
      console.log("serverside - next: ", roomState[room]);
      console.log("question states in all rooms:", roomState);
    });
    // ----- retrieves the current roomState and emits it back to the client -----------------
    socket.on("current_question", ({ room }) => {
      io.to(room).emit("current_question_state", roomState[room]);
      console.log("serverside-current: ", roomState[room]);
      console.log("question states in all rooms:", roomState);
    });

    //----------------- updated scores to all playersn --------------------------
    socket.on("player-scores", ({ room }) => {
      io.to(room).emit("score-update", { updatedScores: roomScores[room] });
    });
    //  ---------------------- handle disconnect ---------------------------------------------------
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