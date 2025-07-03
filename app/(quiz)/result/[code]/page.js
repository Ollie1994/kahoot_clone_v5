"use client";
import { socket } from "@/lib/socketClient";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { use } from "react";
import { useRouter } from "next/navigation";
import ResultHost from "@/components/ResultHost";
import ResultPlayer from "@/components/ResultPlayer";

const Result = ({ params }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const isCorrect = searchParams.get("isCorrect");
  const points = searchParams.get("points");
  const [countdown, setCountdown] = useState(10);
  const router = useRouter();

  const { code } = use(params);
  const [scores, setScores] = useState({});
  const Layout = username === "Host" ? ResultHost : ResultPlayer;

  useEffect(() => {
    socket.emit("join-room", { room: code, username });
    socket.on("timer", ({ countdown }) => {
      setCountdown(countdown);
    });
    if (username === "Host") {
      socket.emit("start-timer");
    }
    socket.on("navigate_game", () => {
      // add if no more questions logic here eaither getready or scoreboard
      socket.emit("current_question", {
        room: code,
      });
      socket.on(
        "current_question_state",
        ({ currentQuestion, numberOfQuestions }) => {
          const question = currentQuestion;
          const tot = numberOfQuestions;
          console.log(`Q = ${question} /// TOT = ${tot} for user ${username}`)
          if (question >= tot) {
            router.push(
              `/scoreboard/${code}?username=${encodeURIComponent(username)}`
            );
          } else {
            router.push(
              `/getready/${code}?username=${encodeURIComponent(username)}`
            );
          }
        }
      );
    });

    if (username === "Host") {
      socket.emit("player-scores", { room: code });
    }
    socket.on("score-update", ({ updatedScores }) => {
      setScores(updatedScores);
    });
    return () => {
      socket.off("score-update");
      socket.off("timer");
      socket.off("navigate_game");
      socket.off("current_question_state");
    };
  }, [code, username]);
  return (
    <Layout
      scores={scores}
      isCorrect={isCorrect}
      points={points}
      countdown={countdown}
    />
  );
};
export default Result;
