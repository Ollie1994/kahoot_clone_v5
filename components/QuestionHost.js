import styles from "@/styles/questionHost.module.css";
const QuestionHost = ({
  questions,
  countdown,
  currentQuestion,
  totalNumberOfQuestions,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.questionContainer}>
        <h1>
          {" "}
          {questions?.[currentQuestion - 1]?.question || "Loading question..."}
        </h1>
      </div>

      <div className={styles.middleContainer}>
        <div className={styles.countdownContainer}>
          <h1>{countdown}</h1>
        </div>
        <div className={styles.imgContainer}>
          <img
            src={questions?.[currentQuestion - 1]?.imageUrl || "Loading img..."}
            alt="image"
          ></img>
        </div>
        <div className={styles.fillerContainer}>
          <h1>Filler</h1>
        </div>
      </div>
      <div className={styles.answersContainer}>
        <div className={styles.topContainer}>
          <div className={styles.triangleContainer}>
            <h2>
              {questions?.[currentQuestion - 1]?.answers?.[0].answer ||
                "Loading answer redOne..."}
            </h2>
          </div>
          <div className={styles.circleContainer}>
            <h2>
              {questions?.[currentQuestion - 1]?.answers?.[1].answer ||
                "Loading answer blueTwo..."}
            </h2>
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.starContainer}>
            <h2>
              {questions?.[currentQuestion - 1]?.answers?.[2].answer ||
                "Loading answer yellowThree..."}
            </h2>
          </div>
          <div className={styles.squareContainer}>
            <h2>
              {questions?.[currentQuestion - 1]?.answers?.[3].answer ||
                "Loading answer greenFour..."}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionHost;
