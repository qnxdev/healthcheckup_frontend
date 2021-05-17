import { useState, useContext, useEffect } from "react";
import { state, store } from "../lib/store";

import Page from "../components/Page";

import styles from "../styles/Home.module.css";
import { Button } from "../components/Button";
import { symptoms } from "../lib/symptoms";

export default function Home() {
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
  const Predict=()=>{
    dispatch({type:'symptoms', payload: list})
  }

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
      <div className="welcome">
        <h1 >Hi {state.user.firstname || "User"}!</h1>
        <h3>What is bothering you today? </h3>
      </div>
      <div className="input-section">
        <div className="symptom-adder">
          <div className="symptom-input">
            <input
              type="text"
              id="input"
              placeholder="Start typing a symptom"
              onClick={() => {
                showSelector(true);
              }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button onClick={Predict}>Next</Button>
          </div>
          <div className="symptom-selector">
            {selector &&
              resObject.map((symptom, index) => (
                <p
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
        </div>
        <div className="symptom-list">
          {list.map((item, index) => (
            <div key={index} className="symptom">
              <p>{item}</p>
              <div
                onClick={() =>
                  setList([
                    ...list.slice(0, index),
                    ...list.slice(index + 1, list.length),
                  ])
                }
                className="delete-symptom"
              >
                x
              </div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}
