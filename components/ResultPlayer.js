import styles from "@/styles/resultPlayer.module.css";
const ResultPlayer = ({ isCorrect, points }) => {
  return (
    <div className={styles.container}>
      <div>{isCorrect === "true" ? "You guessed Correctly" : "You guessed incorrectly"}</div>
      <div> Points awarded: {points}</div>
    </div>
  );
};

export default ResultPlayer;
