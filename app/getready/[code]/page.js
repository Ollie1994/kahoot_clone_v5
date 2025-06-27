"use client";
import { socket } from "@/lib/socketClient";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { use } from "react";
import GetReadyHost from "@/components/GetReadyHost";
import GetReadyPlayer from "@/components/GetReadyPlayer";

const GetReady = ({ params }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const { code } = use(params);
  const [quiz, setQuiz] = useState({});
  const [players, setPlayers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [countdown, setCountdown] = useState(10);
  const Layout = username === "Host" ? GetReadyHost : GetReadyPlayer;

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/getready/${code}`);
        const data = await res.json();
        console.log(data);
        setQuiz(data);
        setPlayers(data.users);
        setQuestions(data.questions);
        console.log("test: " + players);
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
    fetchQuiz();
    return () => {
      socket.off("timer");
    };
  }, [code, username]);

  return <Layout questions={questions} countdown={countdown} />;
};
export default GetReady;
