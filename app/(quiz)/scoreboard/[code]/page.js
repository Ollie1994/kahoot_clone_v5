"use client";
import ScoreboardHost from "@/components/ScoreboardHost";
import ScoreboardPlayer from "@/components/ScoreboardPlayer";
import { socket } from "@/lib/socketClient";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { use } from "react";
import { useRouter } from "next/navigation";
const Scoreboard = ({ params }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const [countdown, setCountdown] = useState(10);
  const router = useRouter();
  const { code } = use(params);
  const [scores, setScores] = useState({});
  const Layout = username === "Host" ? ScoreboardHost : ScoreboardPlayer;

  useEffect(() => {
    socket.emit("join_room", { room: code, username });

    socket.on("timer", ({ countdown }) => {
      setCountdown(countdown);
    });

    socket.on("navigate_home", () => {
      router.push(`/`);
    });

    socket.on("score_update", ({ updatedScores }) => {
      setScores(updatedScores);
    });

    socket.emit("player_scores", { room: code });

    socket.on("time_to_nav", () => {
      if (username === "Host") {
        socket.emit("end_of_game", { room: code });
      }
    });

    if (username === "Host") {
      socket.emit("start_timer");
    }

    return () => {
      socket.off("score_update");
      socket.off("timer");
      socket.off("navigate_home");
      socket.off("time_to_nav");
    };
  }, [code, username]);

  return <Layout scores={scores} username={username} />;
};
export default Scoreboard;
