import styles from "@/styles/lobbyUser.module.css";

const LobbyUser = ({ username }) => {
  return (
    <div className={styles.container}>
      <div className={styles.messageContainer}>
        <h2>
          You have joined with the username: <strong>{username}</strong>, waiting
          for the host to start the game.
        </h2>
      </div>
    </div>
  );
};

export default LobbyUser;
