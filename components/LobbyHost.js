import styles from "@/styles/lobbyHost.module.css";
import Button from "./Button";

const LobbyHost = ({ players, code }) => {
  return (
    <div className={styles.container}>
      <div className={styles.joinContainer}>
        <h1>Join game with code: {code}</h1>
      </div>
      <div className={styles.listHeaderContainer}>
        <h2 className={styles.playerCounterContainer}>
          Number of players: {players.length}
        </h2>
        <div className={styles.buttonContainer}>
          <Button>Start game</Button>
        </div>
      </div>
      <div className={styles.playerListContainer}>
        <h2>Players:</h2>
        <ul>
          {players.map((player, index) => (
            <li key={index}>{player}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LobbyHost;
