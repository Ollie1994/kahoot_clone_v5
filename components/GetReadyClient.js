"use client";
import { socket } from "@/lib/socketClient";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import GetReadyHost from "@/components/GetReadyHost";
import GetReadyPlayer from "@/components/GetReadyPlayer";
import { useRouter } from "next/navigation";

const GetReadyClient = ({ code }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const [quiz, setQuiz] = useState({});
  const [players, setPlayers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [countdown, setCountdown] = useState(10);
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalNumberOfQuestions, setTotalNumberQuestions] = useState(0);
  const Layout = username === "Host" ? GetReadyHost : GetReadyPlayer;
  const hasEmittedRef = useRef(false);

  useEffect(() => {
    socket.on("quiz_data", ({ data }) => {
      console.log("quiz data - ", data);
      setQuiz(data);
      setPlayers(data.users);
      setQuestions(data.questions);
    });

    socket.emit("join_room", { room: code, username });
    socket.on("timer", ({ countdown }) => {
      setCountdown(countdown);
    });
    socket.on("navigate", () => {
      router.push(`/question/${code}?username=${encodeURIComponent(username)}`);
    });
    socket.on(
      "current_question_state",
      ({ currentQuestion, numberOfQuestions }) => {
        setCurrentQuestion(currentQuestion);
        setTotalNumberQuestions(numberOfQuestions);
      }
    );

    // 🧠 Make sure this logic only runs once and only if user is Host
    if (!hasEmittedRef.current && username === "Host") {
      hasEmittedRef.current = true; // prevent future emits
      console.log("✅ Emitting next_question...");
      socket.emit("next_question", { room: code });
    }
    socket.on("time_to_nav", () => {
      if (username === "Host") {
        socket.emit("navigate_game", { room: code });
      }
    });
    socket.emit("get_quiz", { room: code });

    socket.emit("current_question", {
      room: code,
    });

    if (username === "Host") {
      socket.emit("start_timer");
    }

    return () => {
      socket.off("quiz_data");
      socket.off("time_to_nav");
      socket.off("timer");
      socket.off("navigate");
      socket.off("current_question_state");
    };
  }, [code, username]);
  // ------------------- funcs --------------------------

  return (
    <Layout
      questions={questions}
      countdown={countdown}
      currentQuestion={currentQuestion}
    />
  );
};
export default GetReadyClient;
