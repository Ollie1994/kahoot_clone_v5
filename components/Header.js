import styles from "@/styles/header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.linkContainer}>
        <Link href="/">Home</Link>
        <Link href="/createquiz">Create Quiz</Link>
      </div>
    </header>
  );
};

export default Header;
