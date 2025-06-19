import styles from "@/styles/createQuizFormContainer.module.css";
import QuizFormTitle from "./QuizFormTitle";
import DividerLine from "./DividerLine";
const CreateQuizFormContainer = () => {
  return (
    <div className={styles.createQuizFormContainerContainer}>
      <QuizFormTitle></QuizFormTitle>
      <DividerLine></DividerLine>
    </div>
  );
};
export default CreateQuizFormContainer;
