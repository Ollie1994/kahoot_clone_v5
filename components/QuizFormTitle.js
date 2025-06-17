"use client"
import styles from "@/styles/quizFormTitle.module.css";
const QuizFormTitle = () => {
  return (
    <div className={styles.quizFormTitleContainer}>
      <h1 className={styles.createQuizFormTitle}>Create Quiz Form</h1>
      <div className={styles.rowContainer}>
        <div className={styles.columnContainer}>
          <label htmlFor="title">
            <h1>Title:</h1>
          </label>
        </div>
        <div className={styles.columnContainer}>
          <input
            className={styles.titleFormInput}
            type="text"
            placeholder="Enter a title for your quiz"
          />
        </div>
      </div>
    </div>
  );
};
export default QuizFormTitle;
