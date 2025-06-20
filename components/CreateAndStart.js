import styles from "@/styles/createAndStart.module.css";
import Button from "./Button";
import Link from "next/link";
const CreateAndStart = () => {
  return (
    <div className={styles.container}>
      <Link href="/">
        <Button>Create and Start Game</Button>
      </Link>
    </div>
  );
};
export default CreateAndStart;
