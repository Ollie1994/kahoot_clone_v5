"use client";
import { socket } from "@/lib/socketClient";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { use } from "react";

const Game = ({ params }) => {
  const searchParams = useSearchParams()
  const username = searchParams.get("username");
  const { code } = use(params);

  return (
    <>
      Game Room
      <div>User: {username}</div>
    </>
  );
};
export default Game;
