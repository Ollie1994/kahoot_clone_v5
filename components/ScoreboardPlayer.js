import styles from "@/styles/scoreboardPlayer.module.css";
const ScoreboardPlayer = ({ scores, username }) => {
  return (
    <div className={styles.container}>
      <div className={styles.scoreContainer}>
        <h1>
          {username} - {scores[username]}
        </h1>
      </div>
    </div>
  );
};
export default ScoreboardPlayer;
