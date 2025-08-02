import styles from "@/styles/scoreboardHost.module.css";
const ScoreboardHost = ({ scores }) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1>SCORES</h1>
      </div>
      <div className={styles.scoreboardContainer}>
        <ul>
          {Object.entries(scores).map(([player, score]) => (
            <li key={player}>
              {player}: {score}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default ScoreboardHost;
