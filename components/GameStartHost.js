import styles from "@/styles/gameStartHost.module.css";

const GameStartHost = ({ title, players, countdown }) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1>{title}</h1>
      </div>
      <div className={styles.numberContainer}>
        <h2>Number of players {players.length}</h2>
      </div>
      <div className={styles.countdownContainer}><h3>{countdown}</h3></div>
    </div>
  );
};

export default GameStartHost;
