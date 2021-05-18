import { useContext } from "react";
import { store } from "../lib/store";
import Link from "next/link";

export default function Header() {
  const { state, dispatch } = useContext(store);
  return (
    <div className="header">
      <Link href="/">
        <h1>Health Checkup</h1>
      </Link>
      <Link href="/profile" >
        <div className="profile-menu">
          <img width="50px" height="50px"  src={`data:image/png;base64,${state.user.picture}`} alt="" />
          <p>{state.user.firstname}</p>
        </div>
      </Link>
    </div>
  );
}
