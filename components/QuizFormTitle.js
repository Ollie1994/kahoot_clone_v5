"use client";
import styles from "@/styles/quizFormTitle.module.css";
import { useState } from "react";
const QuizFormTitle = () => {
  const [title, setTitle] = useState("");

  /* const [quiz, setQuiz] = useState({
    title: "",
    isLive: false,
    createdAt: Date.now(),
    players: [{ username: "", score: 0 }],
    questions: [
      {
        question: "",
        imageUrl: "",
        answers: [{ answer: "", isCorrect: Boolean }],
      },
    ],
  }); */

  return (
    <div className={styles.quizFormTitleContainer}>
      <h1 className={styles.createQuizFormTitle}>Create Quiz Form</h1>
      <div className={styles.rowContainer}>
        <div className={styles.columnContainer}>
          <label htmlFor="title">
            <h2>Title:</h2>
          </label>
        </div>
        <div className={styles.columnContainer}>
          <input
            className={styles.titleFormInput}
            type="text"
            placeholder="Enter a title for your quiz"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div>{console.log(`Quiz Title: ${title}`)}</div>
        </div>
      </div>
    </div>
  );
};
export default QuizFormTitle;
