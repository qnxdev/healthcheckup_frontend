import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Button } from "../components/Button";
import Page from "../components/Page";
import { diseases } from "../lib/diseases";
import { store } from "../lib/store";
import styles from "../styles/Components/Result.module.css";

export default function Results() {
  const { state, dispatch } = useContext(store);
  const [solutions, setSolutions] = useState([]);
  const router = useRouter();
  /* useEffect(() => {
    if (state.recent == "") {
      router.push("/");
    }
  });
  useEffect(() => {
    if (state.recent && solutions.length == 0) {
      let result = diseases.find((disease) => disease.name == state.recent);
      setSolutions(result ? result.symptoms : []);
    }
  }); */
  return (
    <Page title="Results">
      <div className={styles.results}>
        <h1>Solutions for {state.recent}</h1>
        <ul>
          {["Nasal Washing using salt and warm water", "Use steam to heat up your face","Use Netipot to rinse debris from your nasal cavity","Accupressure: Gently massage your sinus area to improve bloodflow"].map((solution, index) => (
            <li key={index}>
              <h4>{solution}</h4>
            </li>
          ))}
          {/* {solutions.length != 0 && (
            <li>
              <h4>
                No solutions available here for this disease. We recommend that
                you consult a Doctor.
              </h4>
            </li>
          )} */}
        </ul>

        <Button link="/" title="Go back to home">
          Back to home
        </Button>
      </div>
    </Page>
  );
}
