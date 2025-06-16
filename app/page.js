"use client";
import { socket } from "@/lib/socketClient";
import { useEffect } from "react";

// My home page or "/"
export default function Home() {
  useEffect(() => {
    // Let the server know the client is ready
    socket.emit("ready");

    // Listen for messages
    socket.on("message", (msg) => {
      console.log("Received message:", msg);
    });

    return () => {
      socket.off("message");
    };
  }, []);
  return <h1>Hello, Oliwer!</h1>;
}
