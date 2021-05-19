import Link from "next/link";
import styles from "../styles/Components/Button.module.css";
export const Button = ({ width, inverted, children, onClick, link, title }) => {
  const buttonStyle = { width: width || "initial" };
  return (
    <>
      {link ? (
        <Link href={link}>
          <button title={title} style={buttonStyle} className={styles.button}>
            {children}
          </button>
        </Link>
      ) : (
        <button
          title={title}
          style={buttonStyle}
          className={styles.button}
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </>
  );
};
