"use client";
import styles from "@/styles/questionForm.module.css";
import { useState } from "react";
const QuestionForm = () => {
  const [expand, setExpand] = useState(false);
  const [code, setCode] = useState("");
  const [isLive, setIsLive] = useState(false);
  const [createdAt, setCreatedAt] = useState(Date.now());
  const [username, setUsername] = useState("");
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [answerOne, setAnswerOne] = useState("");
  const [answerTwo, setAnswerTwo] = useState("");
  const [answerThree, setAnswerThree] = useState("");
  const [answerFour, setAnswerFour] = useState("");

  // lists
  const [players, setPlayers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  return (
    <div className={styles.columnContainer}>
      <div className={styles.rowContainer}>
        <h2 className={styles.title}>Create a question</h2>
        <button>Minimize</button>
      </div>
      <div className={styles.rowContainer}>
        <div className={styles.questionContainer}>
          <textarea
            className={styles.questionFormInput}
            type="text"
            placeholder="Enter a question for your quiz"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div className={styles.imageUrlContainer}>
          <input
            className={styles.imageUrlFormInput}
            type="text"
            placeholder="Enter a imageUrl for your question"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className={styles.answerContainer}>
          <div className={styles.answersGroup}>
            <input
              className={styles.answerFormInput}
              type="text"
              placeholder="Enter the first answer for your question"
              value={answerOne}
              onChange={(e) => setAnswerOne(e.target.value)}
            />
            <input
              className={styles.answerFormInput}
              type="text"
              placeholder="Enter the second answer for your question"
              value={answerTwo}
              onChange={(e) => setAnswerTwo(e.target.value)}
            />
            <input
              className={styles.answerFormInput}
              type="text"
              placeholder="Enter the third answer for your question"
              value={answerThree}
              onChange={(e) => setAnswerThree(e.target.value)}
            />
            <input
              className={styles.answerFormInput}
              type="text"
              placeholder="Enter the fourth answer for your question"
              value={answerFour}
              onChange={(e) => setAnswerFour(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div>{console.log(`Quiz Question: ${question}`)}</div>
      <div>{console.log(`Quiz URL: ${imageUrl}`)}</div>
      <div>{console.log(`Quiz AnswerOne: ${answerOne}`)}</div>
      <div>{console.log(`Quiz AnswerTwo: ${answerTwo}`)}</div>
      <div>{console.log(`Quiz AnswerThree: ${answerThree}`)}</div>
      <div>{console.log(`Quiz AnswerFour: ${answerFour}`)}</div>
    </div>
  );
};
export default QuestionForm;
