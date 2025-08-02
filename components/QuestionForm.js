"use client";
import styles from "@/styles/questionForm.module.css";
import { useState } from "react";
import Button from "@/components/Button";
import DividerLine from "./DividerLine";
import { createQuiz } from "@/actions/quiz/actions";
import { useRouter } from "next/navigation";
import { socket } from "@/lib/socketClient";


let nextId = 0;

const QuestionForm = () => {
  /* const [expand, setExpand] = useState(false);
  const [code, setCode] = useState("");
  const [isLive, setIsLive] = useState(false);
  const [createdAt, setCreatedAt] = useState(Date.now());
  const [score, setScore] = useState(0); */
  const [question, setQuestion] = useState("");
  const [title, setTitle] = useState("");
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
  const router = useRouter();

  // lists
  const [players, setPlayers] = useState([]);
  const [questions, setQuestions] = useState([]);

  // funcs
  const resetForm = () => {
    setTimeout(() => {
      setQuestion("");
      setImageUrl("");
      setAnswerOne({ answer: "", isCorrect: false });
      setAnswerTwo({ answer: "", isCorrect: false });
      setAnswerThree({ answer: "", isCorrect: false });
      setAnswerFour({ answer: "", isCorrect: false });
    }, 1000);
  };

  async function createGame() {
    const quiz = {
      title: title,
      users: [
        {
          id: 0,
          role: "HOST",
          username: "Host",
          score: 0,
        },
      ],
      questions: questions,
    };
    const code = await createQuiz(quiz);
    console.log(
      "---✅--- INIT room_state... code: ",
      code,
      ", quiz length - ",
      questions.length
    );
    socket.emit("init_room_state", {
      room: code,
      totalQuestions: questions.length,
    });
    router.push(`/lobby/${code}?username=${encodeURIComponent("Host")}`);
  }

  const handleAddQuestion = () => {
    const list = [];
    list.push(answerOne, answerTwo, answerThree, answerFour);
    setQuestions([
      ...questions,
      {
        id: nextId++,
        question: question,
        imageUrl: imageUrl,
        answers: list,
      },
    ]);
    resetForm();
  };

  const handleClick = (e) => {
    switch (e) {
      case "one":
        setAnswerOne({ ...answerOne, isCorrect: true });
        setAnswerTwo({ ...answerTwo, isCorrect: false });
        setAnswerThree({ ...answerThree, isCorrect: false });
        setAnswerFour({ ...answerFour, isCorrect: false });
        break;
      case "two":
        setAnswerOne({ ...answerOne, isCorrect: false });
        setAnswerTwo({ ...answerTwo, isCorrect: true });
        setAnswerThree({ ...answerThree, isCorrect: false });
        setAnswerFour({ ...answerFour, isCorrect: false });
        break;
      case "three":
        setAnswerOne({ ...answerOne, isCorrect: false });
        setAnswerTwo({ ...answerTwo, isCorrect: false });
        setAnswerThree({ ...answerThree, isCorrect: true });
        setAnswerFour({ ...answerFour, isCorrect: false });
        break;
      case "four":
        setAnswerOne({ ...answerOne, isCorrect: false });
        setAnswerTwo({ ...answerTwo, isCorrect: false });
        setAnswerThree({ ...answerThree, isCorrect: false });
        setAnswerFour({ ...answerFour, isCorrect: true });
        break;
      default:
    }
  };

  return (
    <div className={styles.columnContainer}>
      <div className={styles.quizFormTitleContainer}>
        <h1 className={styles.createQuizFormTitle}>Create Quiz Form</h1>
        <div className={styles.titleRowContainer}>
          <div className={styles.columnContainer}>
            <input
              className={styles.titleFormInput}
              type="text"
              placeholder="Enter a title for your quiz"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
      </div>
      <DividerLine></DividerLine>
      <div className={styles.rowContainer}>
        <h2 className={styles.title}>Create a question</h2>
      </div>
      <div className={styles.columnContainer}>
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
                onChange={(e) =>
                  setAnswerOne({ ...answerOne, answer: e.target.value })
                }
              />
              <Button onClick={() => handleClick("one")}>Correct</Button>
            </div>
            <div className={styles.answersGroupRow}>
              <input
                className={styles.answerFormInput}
                type="text"
                placeholder="Enter the second answer for your question"
                value={answerTwo.answer}
                onChange={(e) =>
                  setAnswerTwo({ ...answerTwo, answer: e.target.value })
                }
              />
              <Button onClick={() => handleClick("two")}>Correct</Button>{" "}
            </div>
            <div className={styles.answersGroupRow}>
              <input
                className={styles.answerFormInput}
                type="text"
                placeholder="Enter the third answer for your question"
                value={answerThree.answer}
                onChange={(e) =>
                  setAnswerThree({ ...answerThree, answer: e.target.value })
                }
              />
              <Button onClick={() => handleClick("three")}>Correct</Button>
            </div>
            <div className={styles.answersGroupRow}>
              <input
                className={styles.answerFormInput}
                type="text"
                placeholder="Enter the fourth answer for your question"
                value={answerFour.answer}
                onChange={(e) =>
                  setAnswerFour({ ...answerFour, answer: e.target.value })
                }
              />
              <Button onClick={() => handleClick("four")}>Correct</Button>
            </div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button onClick={() => handleAddQuestion()}>Add Question</Button>
        </div>
      </div>
      <DividerLine></DividerLine>
      <div className={styles.container}>
        <Button onClick={() => createGame()}>Create and Start Game</Button>
      </div>
    </div>
  );
};
export default QuestionForm;
