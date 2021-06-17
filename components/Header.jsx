import { useContext } from "react";
import { store } from "../lib/store";
import Link from "next/link";
import styles from "../styles/Components/Header.module.css";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const { state, dispatch } = useContext(store);
  return (
    <div className={styles.header}>
      <Link href="/">
        <h1>
          {" "}
          <span>+</span> Health Checkup
        </h1>
      </Link>
      <div className={styles.secondarylinks}>
        <Link href="/">
          <p> Home</p>
        </Link>
        <Link href="/diseases">
          <p> All diseases</p>
        </Link>
        <Link href="/dataset.xlsx">
          <p> Dataset</p>
        </Link>
        <Link href="/profile">
          <div className={styles.profilemenu}>
            <img
              width="50px"
              height="50px"
              src={`data:image/png;base64,${state.user.picture}`}
              alt=""
            />
            <p>{state.user.firstname || "User"}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
