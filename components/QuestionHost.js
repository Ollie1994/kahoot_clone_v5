import styles from "@/styles/questionHost.module.css";
const QuestionHost = () => {
  return (
    <div className={styles.container}>
      <div className={styles.questionContainer}>
        <h1>Question 1/..... - Question ...... ...... ?</h1>
      </div>

      <div className={styles.middleContainer}>
        <div className={styles.countdownContainer}>10</div>
        <div className={styles.imgContainer}>
          URL
        </div>
      </div>
      <div className={styles.answersContainer}>
        <div className={styles.leftcontainer}>
          <div className={styles.triangleContainer}>
            <h3>Answer 1</h3>
          </div>
          <div className={styles.starContainer}>
            <h3>Answer 3</h3>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.circleContainer}>
            <h3>Answer 2</h3>
          </div>
          <div className={styles.squareContainer}>
            <h3>Answer 4</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionHost;
