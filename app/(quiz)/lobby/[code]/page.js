"use server";

import LobbyClient from "@/components/LobbyClient";

const Lobby = async (props) => {
  // might need this with "import {use}
  // const { code } = use(params);
  const { code } = await props.params;
  return <LobbyClient code={code} />;
};
export default Lobby;

