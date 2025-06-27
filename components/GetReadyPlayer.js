import styles from "@/styles/gameStartHost.module.css";

const GetReadyPlayer = ({ questions, countdown }) => {
  return (
    <div className={styles.container}>
      <div className={styles.questionContainer}>
        <h1>Question 1</h1>
      </div>
      <div className={styles.numberContainer}>
        <h2>Question 1 of {questions.length}</h2>
      </div>
      <div className={styles.countdownContainer}>
        <h3>{countdown}</h3>
      </div>
    </div>
  );
};

export default GetReadyPlayer;
