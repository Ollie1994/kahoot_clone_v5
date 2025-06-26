"use client";
import { socket } from "@/lib/socketClient";
import { useEffect } from "react";

// My home page or "/"
export default function Home() {
 
 
 // ----------- Test useEffect to make sure client, server coms work.
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
  return<>
  <h1>Home</h1>
 
  
  
  </> 
}
