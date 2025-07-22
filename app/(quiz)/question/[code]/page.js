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
    socket.on("quiz_data", ({data}) => {
      console.log("quiz data - ", data)
      setQuiz(data);
      setPlayers(data.users);
      setQuestions(data.questions);
    });

    socket.emit("join_room", { room: code, username });

    socket.on(
      "current_question_state",
      ({ currentQuestion, numberOfQuestions }) => {
        setCurrentQuestion(currentQuestion);
        setTotalNumberQuestions(numberOfQuestions);
      }
    );

    socket.on("timer", ({ countdown }) => {
      setCountdown(countdown);
    });

    socket.on("navigate", () => {
      let isCorrect = false;
      let score = points;
      switch (playerAnswer) {
        case "redOne":
          console.log(
            "redOne - " + currentQuestion + "/" + totalNumberOfQuestions
          );
          if (
            questions?.[currentQuestion - 1]?.answers?.[0].isCorrect === true
          ) {
            isCorrect = true;
            socket.emit("answer_question", {
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
          console.log(
            "blueTwo - " + currentQuestion + "/" + totalNumberOfQuestions
          );
          if (
            questions?.[currentQuestion - 1]?.answers?.[1].isCorrect === true
          ) {
            isCorrect = true;
            socket.emit("answer_question", {
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
          console.log(
            "yellowThree - " + currentQuestion + "/" + totalNumberOfQuestions
          );
          if (
            questions?.[currentQuestion - 1]?.answers?.[2].isCorrect === true
          ) {
            isCorrect = true;
            socket.emit("answer_question", {
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
          console.log(
            "greenFour - " + currentQuestion + "/" + totalNumberOfQuestions
          );
          if (
            questions?.[currentQuestion - 1]?.answers?.[3].isCorrect === true
          ) {
            isCorrect = true;
            socket.emit("answer_question", {
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

      console.log(
        "User " +
          username +
          " isCorrect = < " +
          isCorrect +
          " > and got a score of " +
          score +
          " during round < " +
          currentQuestion +
          " >"
      );

      router.push(
        `/result/${code}?username=${encodeURIComponent(
          username
        )}&isCorrect=${encodeURIComponent(
          isCorrect
        )}&points=${encodeURIComponent(score)}`
      );
    });
    socket.emit("current_question", {
      room: code,
    });
    socket.on("time_to_nav", () => {
      if (username === "Host") {
        socket.emit("navigate_game", { room: code });
      }
    });
    socket.emit("get_quiz", { room: code });

    if (username === "Host") {
      socket.emit("start_timer");
    }

    return () => {
      socket.off("quiz_data");
      socket.off("navigate");
      socket.off("time_to_nav");
      socket.off("timer");
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
