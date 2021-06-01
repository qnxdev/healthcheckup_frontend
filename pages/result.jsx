import { useContext } from "react";
import { Button } from "../components/Button";
import Page from "../components/Page";
import { store } from "../lib/store";
import styles from "../styles/Components/Result.module.css";

export default function Results() {
  const { state, dispatch } = useContext(store);
  let arr = ["Take Rest", "Drink Water", "Eat Veggies"];
  return (
    <Page title="Results">
      <div className={styles.results}>
        <h1>Solutions for {state.recent}</h1>
        <ul>
          {arr.map((solution, index) => (
            <li key={index}>
              <h4>{solution}</h4>
            </li>
          ))}
        </ul>

        <Button link="/" title="Go back to home">
          Back to home
        </Button>
      </div>
    </Page>
  );
}
