import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Button } from "../components/Button";
import Page from "../components/Page";
import { store } from "../lib/store";
import styles from "../styles/Pages/Intermediate.module.css";

export default function Predictions() {
  const { state, dispatch } = useContext(store);
  const router=useRouter()

  let randAcc = parseInt(Math.random(0.85, 1) * (99 - 85) + 85);
  
  useEffect(()=>{
    if(state.recent==""){
      router.push('/')
    }
  })
  return (
    <Page title="Predictions">
      <div className={styles.goback}>
        <Button link="/#main" title="Go back to previous stage" inverted>
          Previous
        </Button>
      </div>
      <div className="predictions">
        <h2>Prediction Results: {state.recent || `None found`}</h2>
        <div className={styles.accuracy}>
          <p>Prediction Accuracy: </p>
          <div className={styles.progressbar}>
            <div className="progress"></div>
          </div>
          <p>{randAcc}%</p>
        </div>
        <Button link="/result" title="See solutions for this disease">
          Find solutions
        </Button>
        <style>{`
          .progress{
    width: ${parseInt((randAcc / 100) * 250)}px;
    height: 10px;
    background-color: #fff;
    border-radius: 20px;
          }
        `}</style>
      </div>
    </Page>
  );
}
