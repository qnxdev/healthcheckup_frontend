import { useContext } from "react";
import { store } from "../lib/store";
import Link from "next/link";
import styles from "../styles/Components/Header.module.css";

export default function Header() {
  const { state, dispatch } = useContext(store);
  return (
    <div className={styles.header}>
      <Link href="/">
        <h1>Health Checkup</h1>
      </Link>
      <Link href="/profile" >
        <div className={styles.profilemenu}>
          <img width="50px" height="50px"  src={`data:image/png;base64,${state.user.picture}`} alt="" />
          <p>{state.user.firstname || 'User'}</p>
        </div>
      </Link>
    </div>
  );
}
