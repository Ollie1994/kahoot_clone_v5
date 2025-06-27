"use client";
import { socket } from "@/lib/socketClient";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { use } from "react";

const Game = ({ params }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const { code } = use(params);
  const [quiz, setQuiz] = useState({});
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/game/${code}`);
        const data = await res.json();
        console.log(data);
        setQuiz(data);
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

  return (
    <>
      Game Room
      <div>User: {username}</div>
      <div>Title of Quiz: {quiz.title}</div>
      <h1>Countdown: {countdown}</h1>
    </>
  );
};
export default Game;
