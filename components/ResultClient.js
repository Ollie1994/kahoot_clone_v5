"use client";
import { socket } from "@/lib/socketClient";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import ResultHost from "@/components/ResultHost";
import ResultPlayer from "@/components/ResultPlayer";

const ResultClient = ({ code }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const isCorrect = searchParams.get("isCorrect");
  const points = searchParams.get("points");
  const [countdown, setCountdown] = useState(10);
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalNumberOfQuestions, setTotalNumberQuestions] = useState(0);
  const [scores, setScores] = useState({});
  const Layout = username === "Host" ? ResultHost : ResultPlayer;

  useEffect(() => {
    socket.emit("join_room", { room: code, username });
    socket.on("timer", ({ countdown }) => {
      setCountdown(countdown);
    });
    socket.on("navigate_get_ready", () => {
      router.push(`/getready/${code}?username=${encodeURIComponent(username)}`);
    });
    socket.on("navigate_scoreboard", () => {
      router.push(
        `/scoreboard/${code}?username=${encodeURIComponent(username)}`
      );
    });
    socket.on(
      "current_question_state",
      ({ currentQuestion, numberOfQuestions }) => {
        setCurrentQuestion(currentQuestion);
        setTotalNumberQuestions(numberOfQuestions);
      }
    );
    socket.on("score_update", ({ updatedScores }) => {
      setScores(updatedScores);
    });
    socket.on("time_to_nav", () => {
      if (username === "Host") {
        socket.emit("navigate_choice", { room: code });
      }
    });

    socket.emit("current_question", {
      room: code,
    });
    if (username === "Host") {
      socket.emit("player_scores", { room: code });
    }
    if (username === "Host") {
      socket.emit("start_timer");
    }
    return () => {
      socket.off("time_to_nav");
      socket.off("score_update");
      socket.off("timer");
      socket.off("navigate_get_ready");
      socket.off("current_question_state");
      socket.off("navigate_scoreboard");
    };
  }, []);
  return (
    <Layout
      scores={scores}
      isCorrect={isCorrect}
      points={points}
      countdown={countdown}
    />
  );
};
export default ResultClient;
