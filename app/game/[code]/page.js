"use client";
import { socket } from "@/lib/socketClient";
import { useEffect, useState } from "react";
const Game = () => {

    
  /* const [room, setRoom] = useState(1234);
  const [joined, setJoined] = useState(false);
  const [username, setUsername] = useState(""); */
/* 
  useEffect(() => {
    socket.on("user_joined");
    return () => {
      socket.off("user_joined");
    };
  }, []);

  // 
  const handleJoinRoom = () => {
    if (room && username) {
      socket.emit("join-room", { room, username: username });
      setJoined(true);
    }
  }; */

  return <>Game Room </>;
};
export default Game;
