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
    socket.emit("join-room", { room: code, username });

    
      socket.emit("player-scores", { room: code });
    
    socket.on("score-update", ({ updatedScores }) => {
      setScores(updatedScores);
    });
    return () => {
      socket.off("score-update");
    };
  }, [code, username]);

  return <Layout scores={scores} username={username} />;
};
export default Scoreboard;
