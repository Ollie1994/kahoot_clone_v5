"use client";
import { socket } from "@/lib/socketClient";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { use } from "react";
import { useRouter } from "next/navigation";
import QuestionHost from "@/components/QuestionHost";
import QuestionPlayer from "@/components/QuestionPlayer";
const Question = ({ params }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const { code } = use(params);
  const [quiz, setQuiz] = useState({});
  const [players, setPlayers] = useState([]);
  const [playerAnswer, setPlayerAnswer] = useState("");
  const [points, setPoints] = useState(0);
  const [countdown, setCountdown] = useState(10);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalNumberOfQuestions, setTotalNumberQuestions] = useState(0);
  const router = useRouter();
  const Layout = username === "Host" ? QuestionHost : QuestionPlayer;
  // --------------- useEffect -----------------------------------
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/question/${code}`);
        const data = await res.json();
        setQuiz(data);
        setPlayers(data.users);
        setQuestions(data.questions);
      } catch (err) {
        console.log("Error " + err);
      } finally {
      }
    };
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
      let isCorrect = false;
      let score = points;
      switch (playerAnswer) {
        case "redOne":
          if (
            questions?.[currentQuestion - 1]?.answers?.[0].isCorrect === true
          ) {
            isCorrect = true;
            socket.emit("answer-question", {
              room: code,
              username: username,
              points: score,
            });
          } else {
            isCorrect = false;
            score = 0;
          }
          break;
        case "blueTwo":
          if (
            questions?.[currentQuestion - 1]?.answers?.[1].isCorrect === true
          ) {
            isCorrect = true;
            socket.emit("answer-question", {
              room: code,
              username: username,
              points: score,
            });
          } else {
            isCorrect = false;
            score = 0;
          }
          break;
        case "yellowThree":
          if (
            questions?.[currentQuestion - 1]?.answers?.[2].isCorrect === true
          ) {
            isCorrect = true;
            socket.emit("answer-question", {
              room: code,
              username: username,
              points: score,
            });
          } else {
            isCorrect = false;
            score = 0;
          }
          break;
        case "greenFour":
          if (
            questions?.[currentQuestion - 1]?.answers?.[3].isCorrect === true
          ) {
            isCorrect = true;
            socket.emit("answer-question", {
              room: code,
              username: username,
              points: score,
            });
          } else {
            isCorrect = false;
            score = 0;
          }
          break;
      }

      router.push(
        `/result/${code}?username=${encodeURIComponent(
          username
        )}&isCorrect=${encodeURIComponent(
          isCorrect
        )}&points=${encodeURIComponent(score)}`
      );
    });

    fetchQuiz();
    return () => {
      socket.off("timer");
      socket.off("navigate_game");
      socket.off("current_question_state");
    };
  }, [code, username, playerAnswer]);

  // ----------------------------- funcs -----------------------------------------------------
  function handleDataFromChild(data) {
    setPlayerAnswer(data);
    const earnedPoints = countdown * 100;
    setPoints(earnedPoints);
  }

  return (
    <Layout
      questions={questions}
      countdown={countdown}
      sendDataToParent={handleDataFromChild}
      currentQuestion={currentQuestion}
      totalNumberOfQuestions={totalNumberOfQuestions}
    />
  );
};
export default Question;
