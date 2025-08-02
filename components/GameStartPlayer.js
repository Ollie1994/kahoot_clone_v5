import styles from "@/styles/gameStartPlayer.module.css";

const GameStartPlayer = ({ title, countdown }) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1>{title}</h1>
      </div>
      <div className={styles.countdownContainer}>
        <h3>{countdown}</h3>
      </div>
    </div>
  );
};

export default GameStartPlayer;
