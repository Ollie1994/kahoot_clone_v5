"use client";
import styles from "@/styles/join.module.css";
import { addPlayerToQuiz } from "@/actions/join/actions";
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";

const Join = () => {
  const [code, setCode] = useState("");
  const [username, setUsername] = useState("");

  const joinLobby = () => {
    const data = { username: username, code: code };

    addPlayerToQuiz(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.columnContainer}>
        <div className={styles.codeContainer}>
          <input
            className={styles.codeInput}
            type="text"
            placeholder="Enter a code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div className={styles.usernameContainer}>
          <input
            className={styles.usernameInput}
            type="text"
            placeholder="Enter a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Link href="/lobby">
            <Button onClick={() => joinLobby()}>Join Lobby</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Join;
