"use client";
import { socket } from "@/lib/socketClient";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { use } from "react";
import GetReadyHost from "@/components/GetReadyHost";
import GetReadyPlayer from "@/components/GetReadyPlayer";
import { useRouter } from "next/navigation";

const GetReady = ({ params }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const { code } = use(params);
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
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`/api/getready/${code}`);
        const data = await res.json();
        setQuiz(data);
        setPlayers(data.users);
        setQuestions(data.questions);
      } catch (err) {
        console.log("Error " + err);
      } finally {
      }
    };
    // 🧠 Make sure this logic only runs once and only if user is Host
    if (!hasEmittedRef.current && username === "Host") {
      hasEmittedRef.current = true; // prevent future emits
      console.log("✅ Emitting next_question...");
      socket.emit("next_question", { room: code });
    }

    socket.emit("current_question", {
      room: code,
    });
    socket.on(
      "current_question_state",
      ({ currentQuestion, numberOfQuestions }) => {
        setCurrentQuestion(currentQuestion);
        setTotalNumberQuestions(numberOfQuestions);
      }
    );

    socket.emit("join-room", { room: code, username });

    socket.on("timer", ({ countdown }) => {
      setCountdown(countdown);
    });
    if (username === "Host") {
      socket.emit("start-timer");
    }

    socket.on("navigate_game", () => {
      router.push(`/question/${code}?username=${encodeURIComponent(username)}`);
    });
    fetchQuiz();
    return () => {
      socket.off("timer");
      socket.off("navigate_game");
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
export default GetReady;
