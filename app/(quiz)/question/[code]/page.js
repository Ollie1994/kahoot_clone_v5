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
  const [countdown, setCountdown] = useState(10);
  const [questions, setQuestions] = useState([]);
  const router = useRouter();
  const Layout = username === "Host" ? QuestionHost : QuestionPlayer;
  const [dataFromChild, setDataFromChild] = useState("");

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
      router.push(`/question/${code}?username=${encodeURIComponent(username)}`);
    });
    fetchQuiz();
    return () => {
      socket.off("timer");
      socket.off("navigate_game");
    };
  }, [code, username]);

  // ------ funcs -----------
  function handleDataFromChild(data) {
    setDataFromChild(data);
    console.log(`Player ${username} gave the answer - ${data}`)
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
