"use client";
import { socket } from "@/lib/socketClient";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { use } from "react";
import { useRouter } from "next/navigation";
import ResultHost from "@/components/ResultHost";
import ResultPlayer from "@/components/ResultPlayer";

const Result = ({ params }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const isCorrect = searchParams.get("isCorrect");
  const points = searchParams.get("points");

  const { code } = use(params);
  const [scores, setScores] = useState({});
  const Layout = username === "Host" ? ResultHost : ResultPlayer;

  useEffect(() => {
    socket.emit("join-room", { room: code, username });

    if (username === "Host") {
      socket.emit("player-scores", { room: code });
    }
    socket.on("score-update", ({ updatedScores }) => {
      setScores(updatedScores);
      console.log(updatedScores);
    });
    return () => {
      socket.off("score-update");
    };
  }, [code, username]);
  return <Layout scores={scores} isCorrect={isCorrect} points={points} />;
};
export default Result;
