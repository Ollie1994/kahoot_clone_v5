"use client";
import { socket } from "@/lib/socketClient";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import GameStartHost from "@/components/GameStartHost";
import GameStartPlayer from "@/components/GameStartPlayer";
import { useRouter } from "next/navigation";

const GameClient = ({ code, quiz, players }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  /* const [quiz, setQuiz] = useState({});
  const [players, setPlayers] = useState([]);
  const [questions, setQuestions] = useState([]); */

  const [countdown, setCountdown] = useState(10);
  const Layout = username === "Host" ? GameStartHost : GameStartPlayer;
  const router = useRouter();

  useEffect(() => {
    
    socket.emit("set_quiz", { room: code, quiz: quiz });

    socket.emit("join_room", { room: code, username });

    socket.on("timer", ({ countdown }) => {
      setCountdown(countdown);
    });
    socket.on("time_to_nav", () => {
      if (username === "Host") {
        socket.emit("navigate_game", { room: code });
      }
    });

    socket.on("navigate", () => {
      router.push(`/getready/${code}?username=${encodeURIComponent(username)}`);
    });

    if (username === "Host") {
      socket.emit("start_timer");
    }
    return () => {
      socket.off("time_to_nav");
      socket.off("timer");
      socket.off("navigate");
    };
  }, []);

  return <Layout title={quiz.title} players={players} countdown={countdown} />;
};
export default GameClient;
