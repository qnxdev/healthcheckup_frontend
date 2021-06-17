import { useEffect, useState } from "react";
import Page from "../../components/Page";
import { NHS_HOST, NHS_SK1 } from "../../lib/keys";
import { Button } from "../../components/Button";
import styles from "../../styles/Pages/Diseases.module.css";
import Loader from "../../components/Loader";

export default function Diseases() {
  const [result, setResult] = useState({});
  const [url, setUrl] = useState("");
  const [PreviousUrl, setPreviousUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const Fetcher = async () => {
    try {
      const res = await fetch(
        `${NHS_HOST}conditions/?subscription-key=${NHS_SK1}&synonyms=false&childArticles=false&status=all`
      );
      setResult(await res.json());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!result.name) {
      setLoading(true)
      Fetcher();
    }
    else{
      if(loading) setLoading(false)
    }
  });

  return (
    <Page title="All Diseases | Health App">
      <h2>All diseases</h2>
      <br />
      <div className={styles.alldiseases}>
        {!result.significantLink && <h4>{loading ? <Loader/> :  "Failed to load"}</h4>}
        {result.significantLink &&
          result.significantLink.map((item, index) => (
            <a
              href={`/diseases/${item.url.replace(
                "https://api.nhs.uk/conditions/",
                ""
              )}`}
              key={index}
              onClick={() => {
                setUrl(item.url);
              }}
            >
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </a>
          ))}
      </div>
      <div className={styles.navigate}>
        <Button inverted>Previous Page</Button>
        <Button>Next Page</Button>
      </div>
    </Page>
  );
}
