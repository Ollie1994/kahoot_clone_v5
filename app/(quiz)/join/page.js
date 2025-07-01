"use client";
import styles from "@/styles/join.module.css";
import { addPlayerToQuiz } from "@/actions/join/actions";
import { useState } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

const Join = () => {
  const [code, setCode] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  async function joinLobby() {
    const data = { username: username, code: code };
    const check = await addPlayerToQuiz(data);
    if (check) {
      router.push(`/lobby/${code}?username=${encodeURIComponent(username)}`);
    } else {
      setUsername("That username already exists, please enter a new one");
    }
  }

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
          <Button onClick={() => joinLobby()}>Join Lobby</Button>
        </div>
      </div>
    </div>
  );
};
export default Join;
