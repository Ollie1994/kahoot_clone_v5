import styles from "@/styles/getReadyHost.module.css";

const GetReadyHost = ({ questions, countdown, currentQuestion }) => {
  const questionState = currentQuestion - 1;
  return (
    <div className={styles.container}>
      <div className={styles.numberContainer}>
        <h1>Question {questionState} of {questions.length}</h1>
      </div>
      <h3 className={styles.questionContainer}>
        {console.log("CQ = " + currentQuestion)}
        {console.log("after - 1  = " + questionState)}
        {questions?.[questionState]?.question || "Loading question..."}
      </h3>

      <div className={styles.countdownContainer}>
        <h3>{countdown}</h3>
      </div>
    </div>
  );
};

export default GetReadyHost;
