import styles from "@/styles/createQuizFormContainer.module.css";
import QuizFormTitle from "./QuizFormTitle";
import DividerLine from "./DividerLine";
import QuestionForm from "./QuestionForm";
import CreateAndStart from "./CreateAndStart";
const CreateQuizFormContainer = () => {
  return (
    <div className={styles.createQuizFormContainerContainer}>
      <QuizFormTitle></QuizFormTitle>
      <DividerLine></DividerLine>
      <QuestionForm></QuestionForm>
      <DividerLine></DividerLine>
      <CreateAndStart></CreateAndStart>
    </div>
  );
};
export default CreateQuizFormContainer;
