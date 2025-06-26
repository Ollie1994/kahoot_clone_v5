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

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/game/${code}`);
        const data = await res.json();
        console.log(data)
        setQuiz(data);
      } catch (err) {
        console.log("Error " + err);
      } finally {
      }
    };
    fetchQuiz();
  }, []);

  return (
    <>
      Game Room
      <div>User: {username}</div>
      <div>Title of Quiz: {quiz.title}</div>
    </>
  );
};
export default Game;
