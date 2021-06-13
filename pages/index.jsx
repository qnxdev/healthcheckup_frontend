import { useState, useContext, useEffect } from "react";
import { store } from "../lib/store";
import { useRouter } from "next/router";
import Page from "../components/Page";
import styles from "../styles/Pages/Home.module.css";
import { Button } from "../components/Button";
import Link from "next/link";
import ModelContainer from "../components/ModelContainer";
import { SymtomInput } from "../components/SymptomInput";
import { groupsymptoms } from "../lib/symptoms";

export default function Home() {
  const router = useRouter();
  const { state, dispatch } = useContext(store);
  const [list, setList] = useState(state.symptoms);
  const Predict = async () => {
    if (list.length > 0) {
      dispatch({ type: "symptoms", payload: list });
      try {
        const res = await fetch(
          `/api/prediction?symptoms=${state.symptoms.join(",")}`
        );
        const { disease } = await res.json();
        dispatch({ type: "recent", payload: disease });
        console.log(disease);
      } catch (error) {
        console.log(error);
      }
      router.push("/intermediate");
    }
  };

  return (
    <Page title="Home">
      <div className={styles.welcome}>
        <h1>Hi {state.user.firstname || "User"}!</h1>
        <h3>What is bothering you today? </h3>
      </div>
      <div id="main" className={styles.main}></div>
      <div
        className={styles.inputsection}
        onMouseEnter={() => {
          if (window && window.innerWidth > 640) {
            router.push("/#main");
          }
        }}
      >
        <SymtomInput list={list} setList={setList} next={Predict} />
        <div className={styles.graphicalinput}>
          <ModelContainer
            type={state.user.sex}
            list={list}
            setList={setList}
            next={Predict}
          />
        </div>
      </div>
      <div className={styles.recents}>
        <h3>Recent Predictions : {state.recent || "None"}</h3>
      </div>
    </Page>
  );
}
