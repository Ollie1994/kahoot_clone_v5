import styles from "@/styles/resultHost.module.css";
const ResultHost = ({ scores, countdown }) => {
  return (
    <div className={styles.container}>
      <h1>{countdown}, SCORES:</h1>
      <ul>
        {Object.entries(scores).map(([player, score]) => (
          <li key={player}>
            {player}: {score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultHost;
