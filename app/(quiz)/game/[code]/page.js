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
  const [countdown, setCountdown] = useState(10);
  const Layout = username === "Host" ? GameStartHost : GameStartPlayer;
  const router = useRouter();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`/api/game/${code}`);
        const data = await res.json();
        setQuiz(data);
        setPlayers(data.users);
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
      console.log("INSIDE init_room_state !!!!!");
      if (username === "Host") {
        socket.emit("init_room_state", {
          room: code,
          totalQuestions: quiz.questions.length,
        });
      }
      router.push(`/getready/${code}?username=${encodeURIComponent(username)}`);
    });

    fetchQuiz();
    return () => {
      socket.off("timer");
      socket.off("navigate_game");
    };
  }, [countdown, code, username]);

  return <Layout title={quiz.title} players={players} countdown={countdown} />;
};
export default Game;
