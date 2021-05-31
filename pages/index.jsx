import { useState, useContext, useEffect } from "react";
import { store } from "../lib/store";
import { useRouter } from "next/router";
import Page from "../components/Page";
import styles from "../styles/Pages/Home.module.css";
import { Button } from "../components/Button";
import { symptoms } from "../lib/symptoms";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const { state, dispatch } = useContext(store);
  const [resObject, setResObject] = useState(symptoms);
  const [list, setList] = useState([]);
  const [selector, showSelector] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const showMessage = (message, type) => {
    const InputElement = document.getElementById("input");
    if (type == "success") {
      InputElement.className = "GreenSuccessInput";
    } else {
      InputElement.className = "RedErrorInput";
    }
    InputElement.placeholder = message;
    setTimeout(() => {
      InputElement.placeholder = "Start typing a symptom";
    }, 2000);
  };
  const Predict = () => {
    dispatch({ type: "symptoms", payload: list });
    router.push("/intermediate");
  };
  useEffect(() => {
    if (searchTerm.length == 0) {
      setResObject(symptoms);
      showSelector(false);
    } else {
      const results = symptoms.filter(function (symptom) {
        if (
          symptom.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !list.includes(symptom)
        )
          return symptom;
      });
      setResObject(results);
      showSelector(true);
    }
  }, [searchTerm]);

  return (
    <Page title="Home">
      <Link href="/testmodel" ><button>View model test version</button></Link>
      <div
        onClick={() => {
          showSelector(false);
        }}
        className={styles.welcome}
      >
        <h1>Hi {state.user.firstname || "User"}!</h1>
        <h3>What is bothering you today? </h3>
      </div>
      <div className={styles.inputsection}>
        <div className={styles.symptominput}>
          <div className={styles.symptomadder}>
            <input
              autoComplete="off"
              type="text"
              id="input"
              placeholder="Start typing a symptom"
              onClick={() => {
                showSelector(true);
              }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {selector && (
              <div className={styles.symptomselector}>
                {resObject.map((symptom, index) => (
                  <p
                    title="Add this"
                    onClick={() => {
                      if (!list.includes(symptom)) {
                        setList([...list, symptom]);
                        showMessage("Symptom added", "success");
                        showSelector(false);
                      } else {
                        showMessage("Symptom already added!", "error");
                        showSelector(false);
                      }
                    }}
                    key={index}
                  >
                    {symptom}
                  </p>
                ))}
              </div>
            )}
          </div>
          <Button onClick={Predict} width="150px" title="Predict disease">
            Next
          </Button>
        </div>
        {list.length > 0 && (
          <div className={styles.symptomlist}>
            {list.map((item, index) => (
              <div
                key={index}
                className={styles.symptom}
                onClick={() =>
                  setList([
                    ...list.slice(0, index),
                    ...list.slice(index + 1, list.length),
                  ])
                }
              >
                <p>{item}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path
                    fill="#3b1948"
                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                  />
                </svg>
              </div>
            ))}
          </div>
        )}

      </div>
      <h3>Recent Predictions : {state.recent || "None"}</h3>
    </Page>
  );
}
