import styles from "@/styles/createQuizFormContainer.module.css";

import DividerLine from "./DividerLine";
import QuestionForm from "./QuestionForm";
const CreateQuizFormContainer = () => {

  return (
    <div className={styles.createQuizFormContainerContainer}>
      <QuestionForm></QuestionForm>
    </div>
  );
};
export default CreateQuizFormContainer;
