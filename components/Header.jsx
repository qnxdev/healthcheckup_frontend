import { useContext } from "react";
import { store } from "../lib/store";

export default function Header() {
  const { state, dispatch } = useContext(store);
  return (
    <div className="header">
      <h1>Health Checkup</h1>
      <img src='' alt=""/>
      <p>{state.user.firstname}</p>
    </div>
  );
}
