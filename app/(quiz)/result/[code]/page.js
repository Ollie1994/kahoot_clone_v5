"use client";
import { socket } from "@/lib/socketClient";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { use } from "react";
import { useRouter } from "next/navigation";
const Result = ({ params }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const { code } = use(params);
  const [scores, setScores] = useState({});

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
  return (
    <div>
      <h2>SCORES:</h2>
      <ul>
        {Object.entries(scores).map(([player, score]) => (
          <li key={player}>
            {player}: {score}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Result;
