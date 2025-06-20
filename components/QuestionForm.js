"use client";
import styles from "@/styles/questionForm.module.css";
import { useState } from "react";
import Button from "@/components/Button";
const QuestionForm = () => {
  const [expand, setExpand] = useState(false);
  const [code, setCode] = useState("");
  const [isLive, setIsLive] = useState(false);
  const [createdAt, setCreatedAt] = useState(Date.now());
  const [username, setUsername] = useState("");
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [answerOne, setAnswerOne] = useState({ answer: "", isCorrect: false });
  const [answerTwo, setAnswerTwo] = useState({ answer: "", isCorrect: false });
  const [answerThree, setAnswerThree] = useState({
    answer: "",
    isCorrect: false,
  });
  const [answerFour, setAnswerFour] = useState({
    answer: "",
    isCorrect: false,
  });

  // lists
  const [players, setPlayers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  // funcs

  const handleClick = (e) => {
    console.log(`Clicked by: ${e}`);
    console.log(
      `FIRST ------ \n1=${answerOne.isCorrect} \n2=${answerTwo.isCorrect} \n3=${answerThree.isCorrect}\n4=${answerFour.isCorrect} `
    );
    switch (e) {
      case "one":
        console.log("1?");
        setAnswerOne({ ...answerOne, isCorrect: true });
        setAnswerTwo({ ...answerTwo, isCorrect: false });
        setAnswerThree({ ...answerThree, isCorrect: false });
        setAnswerFour({ ...answerFour, isCorrect: false });
        break;
      case "two":
        console.log("2?");
        setAnswerOne({ ...answerOne, isCorrect: false });
        setAnswerTwo({ ...answerTwo, isCorrect: true });
        setAnswerThree({ ...answerThree, isCorrect: false });
        setAnswerFour({ ...answerFour, isCorrect: false });
        break;
      case "three":
        console.log("3?");
        setAnswerOne({ ...answerOne, isCorrect: false });
        setAnswerTwo({ ...answerTwo, isCorrect: false });
        setAnswerThree({ ...answerThree, isCorrect: true });
        setAnswerFour({ ...answerFour, isCorrect: false });
        break;
      case "four":
        console.log("4?");
        setAnswerOne({ ...answerOne, isCorrect: false });
        setAnswerTwo({ ...answerTwo, isCorrect: false });
        setAnswerThree({ ...answerThree, isCorrect: false });
        setAnswerFour({ ...answerFour, isCorrect: true });
        break;
      default:
      // code block
    }
    console.log(
      `SECOND ------ \n1=${answerOne.isCorrect} \n2=${answerTwo.isCorrect} \n3=${answerThree.isCorrect}\n4=${answerFour.isCorrect} `
    );
  };

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
            <div className={styles.answersGroupRow}>
              <input
                className={styles.answerFormInput}
                type="text"
                placeholder="Enter the first answer for your question"
                value={answerOne.answer}
                onChange={(e) => setAnswerOne({...answerOne, answer: e.target.value})}
              />
              <Button onClick={() => handleClick("one")}>Correct</Button>
            </div>
            <div className={styles.answersGroupRow}>
              <input
                className={styles.answerFormInput}
                type="text"
                placeholder="Enter the second answer for your question"
                value={answerTwo.answer}
                onChange={(e) => setAnswerTwo({...answerTwo, answer: e.target.value})}
              />
              <Button onClick={() => handleClick("two")}>Correct</Button>{" "}
            </div>
            <div className={styles.answersGroupRow}>
              <input
                className={styles.answerFormInput}
                type="text"
                placeholder="Enter the third answer for your question"
                value={answerThree.answer}
                onChange={(e) => setAnswerThree({...answerThree, answer: e.target.value})}
              />
              <Button onClick={() => handleClick("three")}>Correct</Button>
            </div>
            <div className={styles.answersGroupRow}>
              <input
                className={styles.answerFormInput}
                type="text"
                placeholder="Enter the fourth answer for your question"
                value={answerFour.answer}
                onChange={(e) => setAnswerFour({...answerFour, answer: e.target.value})}
              />
              <Button onClick={() => handleClick("four")}>Correct</Button>
            </div>
          </div>
        </div>
      </div>
      <div>{console.log(`Quiz Question: ${question}`)}</div>
      <div>{console.log(`Quiz URL: ${imageUrl}`)}</div>
      <div>
        {console.log(`Quiz AnswerOne: ${answerOne.answer} = ${answerOne.isCorrect}`)}
      </div>
      <div>
        {console.log(`Quiz AnswerTwo: ${answerTwo.answer} = ${answerTwo.isCorrect}`)}
      </div>
      <div>
        {console.log(
          `Quiz AnswerThree: ${answerThree.answer} = ${answerThree.isCorrect}`
        )}
      </div>
      <div>
        {console.log(
          `Quiz AnswerFour: ${answerFour.answer} = ${answerFour.isCorrect}`
        )}
      </div>
    </div>
  );
};
export default QuestionForm;
