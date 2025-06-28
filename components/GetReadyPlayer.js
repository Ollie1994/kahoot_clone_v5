import styles from "@/styles/getReadyPlayer.module.css";

const GetReadyPlayer = ({ questions, countdown }) => {
  return (
    <div className={styles.container}>
      <div className={styles.numberContainer}>
        <h1>Question 1 of {questions.length}</h1>
      </div>
      <div className={styles.countdownContainer}>
        <h3>{countdown}</h3>
      </div>
    </div>
  );
};

export default GetReadyPlayer;
