import styles from "@/styles/questionPlayer.module.css";
const QuestionPlayer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.answersContainer}>
        <div className={styles.topContainer}>
          <div className={styles.triangleContainer}>
            <h2></h2>
          </div>
          <div className={styles.circleContainer}>
            <h2></h2>
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.starContainer}>
            <h2></h2>
          </div>
          <div className={styles.squareContainer}>
            <h2></h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionPlayer;
