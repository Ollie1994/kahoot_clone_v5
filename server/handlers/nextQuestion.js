import { roomState } from "../states/states.js";
export function nextQuestion(socket, io, { room }) {
  // ✅ Prevent double advancement
  if (roomState[room].hasAdvanced) {
    console.log(`Host already advanced for question ${roomState[room].currentQuestion}`);
    return;
  }
  if (roomState[room]) {
    roomState[room].currentQuestion++;
    roomState[room].hasAdvanced = true;
  }
  console.log("question state:", roomState[room]);
}
