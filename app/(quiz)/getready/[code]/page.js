"use client";
import { socket } from "@/lib/socketClient";
import { useEffect, useState } from "react";
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
  const Layout = username === "Host" ? GetReadyHost : GetReadyPlayer;

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

  return <Layout questions={questions} countdown={countdown} />;
};
export default GetReady;
