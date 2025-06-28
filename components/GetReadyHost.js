import styles from "@/styles/getReadyHost.module.css";

const GetReadyHost = ({ questions, countdown }) => {
  return (
    <div className={styles.container}>
        <div className={styles.numberContainer}>
          <h1>Question 1 of {questions.length}</h1>
        </div>
        <h3 className={styles.questionContainer}>
          {questions?.[0]?.question || "Loading question..."}
        </h3>
      

      <div className={styles.countdownContainer}>
        <h3>{countdown}</h3>
      </div>
    </div>
  );
};

export default GetReadyHost;
