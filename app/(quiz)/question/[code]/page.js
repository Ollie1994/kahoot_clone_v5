
import QuestionClient from "@/components/QuestionClient";

const Question = async (props) => {
  // might need this with "import {use}
  // const { code } = use(params);
  const { code } = await props.params;
  return <QuestionClient code={code} />;
};
export default Question;
