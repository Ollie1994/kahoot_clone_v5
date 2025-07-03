import styles from "@/styles/scoreboardPlayer.module.css"
const ScoreboardPlayer = ({scores, username}) => {

  return (
    <div className={styles.container}>
      <div>{username} - {scores[username]}</div>
    </div>
  );
};
export default ScoreboardPlayer;
