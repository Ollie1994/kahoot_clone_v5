"use client";
import { socket } from "@/lib/socketClient";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LobbyHost from "@/components/LobbyHost";
import LobbyUser from "@/components/LobbyUser";
import { useRouter } from "next/navigation";

const LobbyClient = ({ code }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const [players, setPlayers] = useState([]);
  const Layout = username === "Host" ? LobbyHost : LobbyUser;
  const router = useRouter();

  useEffect(() => {
    // Join room
    socket.emit("join_room", { room: code, username });

    // Update full player list
    socket.on("players_list", (list) => {
      setPlayers(list);
    });

    socket.on("navigate_to_game", () => {
      router.push(`/game/${code}?username=${encodeURIComponent(username)}`);
    });
    // Cleanup
    return () => {
      socket.off("players_list");
      socket.off("navigate_to_game");
    };
  }, []);

  const startGame = () => {
    socket.emit("navigate_to_game", { room: code });
  };

  return (
    <Layout
      username={username}
      players={players}
      code={code}
      startGame={startGame}
    />
  );
};

export default LobbyClient;
