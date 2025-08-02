import ScoreboardClient from "@/components/ScoreboardClient";

const Scoreboard = async (props) => {
  // might need this with "import {use}
  // const { code } = use(params);
   const { code } = await props.params;

  return <ScoreboardClient code={code} />;
};
export default Scoreboard;
