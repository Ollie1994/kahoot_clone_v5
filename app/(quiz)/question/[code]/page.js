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
  const router = useRouter();
  const Layout = username === "Host" ? QuestionHost : QuestionPlayer;
  // --------------- useEffect -----------------------------------
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/question/${code}`);
        const data = await res.json();
        console.log(data);
        setQuiz(data);
        setPlayers(data.users);
        setQuestions(data.questions);
      } catch (err) {
        console.log("Error " + err);
      } finally {
      }
    };
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
      console.log("before switch: " + playerAnswer);
      switch (playerAnswer) {
        case "redOne":
          console.log("caseOne");
          if (questions?.[0]?.answers?.[0].isCorrect === true) {
            console.log(`Right Answer ${username}, you got ${score} points`);
            isCorrect = true;
            socket.emit("answer-question", {
              room: code,
              username: username,
              points: score,
            });
          } else {
            console.log("WRONG ANSWER");
            isCorrect = false;
            score = 0;
          }
          break;
        case "blueTwo":
          console.log("caseTwo");

          if (questions?.[0]?.answers?.[1].isCorrect === true) {
            console.log(`Right Answer ${username}, you got ${score} points`);
            isCorrect = true;
            socket.emit("answer-question", {
              room: code,
              username: username,
              points: score,
            });
          } else {
            console.log("WRONG ANSWER");
            isCorrect = false;
            score = 0;
          }
          break;
        case "yellowThree":
          console.log("caseThree");

          if (questions?.[0]?.answers?.[2].isCorrect === true) {
            console.log(`Right Answer ${username}, you got ${score} points`);
            isCorrect = true;
            socket.emit("answer-question", {
              room: code,
              username: username,
              points: score,
            });
          } else {
            console.log("WRONG ANSWER");
            isCorrect = false;
            score = 0;
          }
          break;
        case "greenFour":
          console.log("caseFour");

          if (questions?.[0]?.answers?.[3].isCorrect === true) {
            console.log(`Right Answer ${username}, you got ${score} points`);
            isCorrect = true;
            socket.emit("answer-question", {
              room: code,
              username: username,
              points: score,
            });
          } else {
            console.log("WRONG ANSWER");
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
    };
  }, [code, username, playerAnswer]);

  // ----------------------------- funcs -----------------------------------------------------
  function handleDataFromChild(data) {
    setPlayerAnswer(data);
    const earnedPoints = countdown * 100;
    setPoints(earnedPoints);
    console.log(
      `FUNC - Player ${username} gave the answer - ${data} and potentially got ${earnedPoints} points`
    );
  }

  return (
    <Layout
      questions={questions}
      countdown={countdown}
      sendDataToParent={handleDataFromChild}
    />
  );
};
export default Question;
