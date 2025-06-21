import styles from "@/styles/button.module.css";
const Button = ({ children, onClick}) => {
  return (
    <button className={styles.buttonContainer} onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;
