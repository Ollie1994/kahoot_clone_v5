"use client";
import { socket } from "@/lib/socketClient";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { use } from "react";

const Lobby = ({ params }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const { code } = use(params);
  const room = code;
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.on("user_joined");
    console.log("Joining room:", room);
    socket.emit("join-room", { room, username: username });
    return () => {
      socket.off("user_joined");
    };
  }, []);

  return <></>;
};
export default Lobby;
