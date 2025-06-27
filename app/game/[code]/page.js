"use client";
import { socket } from "@/lib/socketClient";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { use } from "react";
import GameStartHost from "@/components/GameStartHost";
import GameStartPlayer from "@/components/GameStartPlayer";

const Game = ({ params }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const { code } = use(params);
  const [quiz, setQuiz] = useState({});
  const [players, setPlayers] = useState([]);
  const [countdown, setCountdown] = useState(0);
  const Layout = username === "Host" ? GameStartHost : GameStartPlayer;

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/game/${code}`);
        const data = await res.json();
        console.log(data);
        setQuiz(data);
        setPlayers(data.users);
        console.log("test: " + players)
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

  return <Layout title={quiz.title} players={players} countdown={countdown} />;
};
export default Game;
