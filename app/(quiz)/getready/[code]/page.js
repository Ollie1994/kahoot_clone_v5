
import GetReadyClient from "@/components/GetReadyClient";

const GetReady = async (props) => {
  // might need this with "import {use}
  // const { code } = use(params);
  const { code } = await props.params;
  return <GetReadyClient code={code} />;
};
export default GetReady;
