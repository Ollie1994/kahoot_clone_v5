import styles from "@/styles/createQuizFormContainer.module.css";
import QuizFormTitle from "./QuizFormTitle";
const CreateQuizFormContainer = () => {
  return (
    <div className={styles.createQuizFormContainerContainer}>
      <QuizFormTitle></QuizFormTitle>
    </div>
  );
};
export default CreateQuizFormContainer;
