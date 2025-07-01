import styles from "@/styles/questionPlayer.module.css";
const QuestionPlayer = ({ sendDataToParent }) => {
  const handleClick = (data) => {
    sendDataToParent(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.answersContainer}>
        <div className={styles.topContainer}>
          <button
            onClick={() => handleClick("redOne")}
            className={styles.triangleContainer}
          ></button>

          <button
            onClick={() => handleClick("blueTwo")}
            className={styles.circleContainer}
          ></button>
        </div>

        <div className={styles.bottomContainer}>
          <button
            onClick={() => handleClick("yellowThree")}
            className={styles.starContainer}
          ></button>
          <button
            onClick={() => handleClick("greenFour")}
            className={styles.squareContainer}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default QuestionPlayer;
