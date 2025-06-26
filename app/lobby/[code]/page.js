"use client";
import { socket } from "@/lib/socketClient";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { use } from "react";
import LobbyHost from "@/components/LobbyHost";
import LobbyUser from "@/components/LobbyUser";

const Lobby = ({ params }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const { code } = use(params);
  const [players, setPlayers] = useState([]);
  const Layout = username === "Host" ? LobbyHost : LobbyUser;

  useEffect(() => {
    // Join room
    socket.emit("join-room", { room: code, username });

    // Update full player list
    socket.on("players_list", (list) => {
      setPlayers(list);
    });

    // Cleanup
    return () => {
      socket.off("players_list");
    };
  }, [code, username]);

  return <Layout username={username} players={players} code={code} />;
};

export default Lobby;
