
import ResultClient from "@/components/ResultClient";

const Result = async (props) => {
  // might need this with "import {use}
  // const { code } = use(params);
  const { code } = await props.params;
  return <ResultClient code={code} />;
};
export default Result;
