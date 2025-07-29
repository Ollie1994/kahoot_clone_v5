
import GameClient from "@/components/GameClient";
import { getQuizByCode } from "@/lib/getQuizByCode";

const Game = async (props) => {
  // might need this with "import {use}
  // const { code } = use(params);
  const { code } = await props.params;
  const data = await getQuizByCode(code);

  return <GameClient code={code} quiz={data} players={data.users} />;
};
export default Game;
