"use client";
import { socket } from "@/lib/socketClient";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { use } from "react";

const Lobby = ({ params }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const { code } = use(params);
  const [players, setPlayers] = useState([]);

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

  return (
    <>
      <h2>Players:</h2>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
    </>
  );
};

export default Lobby;
