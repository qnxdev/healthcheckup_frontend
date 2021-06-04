import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { symptoms } from "../lib/symptoms";
import styles from "../styles/Components/SymtomInput.module.css";

export const SymtomInput = ({ list, setList, next, secondary }) => {
  const [selector, showSelector] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [resObject, setResObject] = useState(symptoms);

  const showMessage = (message, type) => {
    const InputElement = document.getElementById(
      `input${secondary ? "sec" : ""}`
    );
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
    <div
      style={{
        width: secondary ? "100%" : "40%",
        margin: secondary ? "0" : "100px 0",
      }}
      className={styles.symptominputwrapper}
    >
      <div
        style={{
          flexWrap: secondary ? "wrap" : "initial",
          width: secondary ? "20vw" : "40%",
          background:
            secondary && selector
              ? "linear-gradient(90deg, #316fa3, #204c70)"
              : "initial",
          borderRadius: secondary ? "10px" : "initial",
        }}
        className={styles.symptominput}
        id={secondary ? "secondary" : "primary"}
      >
        <div
          style={{
            margin: secondary ? "10px 0" : "0 10px 0",
            width: secondary ? "100%" : "50%",
          }}
          className={styles.symptomadder}
        >
          <input
            autoComplete="off"
            type="text"
            id={`input${secondary ? "sec" : ""}`}
            placeholder="Start typing a symptom"
            onClick={() => {
              showSelector(!selector);
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
        <Button
          onClick={next}
          width={secondary ? "30vw" : "150px"}
          title="Predict disease"
        >
          Next
        </Button>
      </div>
      {list.length > 0 && (
        <div
          style={{
            width: secondary ? "100%" : "32vw",
            marginTop: secondary ? "120px" : "70px",
            filter: secondary && selector ? "blur(62px)" : "none",
          }}
          className={styles.symptomlist}
          id={secondary ? "secondarylist" : "primarylist"}
        >
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
                  fill="#192a48"
                  d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                />
              </svg>
            </div>
          ))}
        </div>
      )}
      <style jsx>{`

@media (max-width: 640px) {
  #secondary {
    margin-left: -5vw !important;
    transform: scale(0.9);
  }

  #secondarylist {
    margin-top: 50px !important;
  }
}
      `}</style>
    </div>
  );
};
