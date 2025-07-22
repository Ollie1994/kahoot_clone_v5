"use client";
import { socket } from "@/lib/socketClient";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { use } from "react";
import GameStartHost from "@/components/GameStartHost";
import GameStartPlayer from "@/components/GameStartPlayer";
import { useRouter } from "next/navigation";

const Game = ({ params }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const { code } = use(params);
  const [quiz, setQuiz] = useState({});
  const [players, setPlayers] = useState([]);
  const [questions, setQuestions] = useState([]);

  const [countdown, setCountdown] = useState(10);
  const Layout = username === "Host" ? GameStartHost : GameStartPlayer;
  const router = useRouter();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`/api/game/${code}`);
        const data = await res.json();
        socket.emit("set_quiz", { room: code, quiz: data });
        setQuiz(data);
        setPlayers(data.users);
        setQuestions(data.questions);
      } catch (err) {
        console.log("Error " + err);
      } finally {
      }
    };
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
    fetchQuiz();
    return () => {
      socket.off("time_to_nav");
      socket.off("timer");
      socket.off("navigate");
    };
  }, [countdown, code, username]);

  return <Layout title={quiz.title} players={players} countdown={countdown} />;
};
export default Game;
