import styles from "@/styles/resultPlayer.module.css";
const ResultPlayer = ({ isCorrect, points, countdown }) => {
  return (
    <div className={styles.container}>
      <h1>{countdown}</h1>
      <div>
        {isCorrect === "true"
          ? "You guessed Correctly"
          : "You guessed Incorrectly"}
      </div>
      <div> Points awarded: {points}</div>
    </div>
  );
};

export default ResultPlayer;
