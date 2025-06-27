import styles from "@/styles/gameStartHost.module.css";
// fix this {questions[0]}
const GetReadyHost = ({ questions, countdown }) => {
  return (
    <div className={styles.container}>
      <div className={styles.questionContainer}>
        <h1>Question 1</h1>
        <h2>BAPAPPA</h2>
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

export default GetReadyHost;
