"use client";
import { socket } from "@/lib/socketClient";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { use } from "react";
import { useRouter } from "next/navigation";
import QuestionHost from "@/components/QuestionHost";
import QuestionPlayer from "@/components/QuestionPlayer";
const Question = ({ params }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const { code } = use(params);
  const [quiz, setQuiz] = useState({});
  const [players, setPlayers] = useState([]);
  const [countdown, setCountdown] = useState(10);
  const router = useRouter();
  const Layout = username === "Host" ? QuestionHost : QuestionPlayer;

  return <Layout />;
};
export default Question;
