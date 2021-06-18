import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Page from "../../components/Page";
import { NHS_HOST, NHS_SK1 } from "../../lib/keys";
import styles from "../../styles/Pages/Disease.module.css";

export default function Disease() {
  const router = useRouter();
  const [result, setResult] = useState({});

  const FormatDate = (date) => {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Ma",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let d = new Date(date);
    return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
  };
  const HTMLParser = (html) => {
    let parser = new DOMParser();
    return parser
      .parseFromString(html, "text/html")
      .getElementsByTagName("body")[0].innerText;
  };
  const Fetcher = async () => {
    try {
      const res = await fetch(
        `${NHS_HOST}conditions/${router.query.name}/?subscription-key=${NHS_SK1}&synonyms=false&childArticles=false&status=all`
      );
      setResult(await res.json());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!result.name && router.query.name) {
      Fetcher();
    }
  }, [result, router]);

  return (
    <Page title={result.name || "Loading"}>
      <div className={styles.disease}>
        {!result.name && (
          <div className={styles.loading}>
            <Loader size={50} />
          </div>
        )}
        {result.name && (
          <div className={styles.diseasecontent}>
            <div className={styles.diseasehead}>
              <h1>{result.name}</h1>
              <div className={styles.diseaseinfo}>
                <p>Source: NHS United Kingdom</p>
                <p>{FormatDate(result.dateModified)}</p>
              </div>
              <h4>{result.description}</h4>
            </div>
            <div className={styles.diseasebody}>
              {result.mainEntityOfPage.map((item, index) => (
                <p key={index}>{item.mainEntityOfPage[0] && HTMLParser(item.mainEntityOfPage[0].text)}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </Page>
  );
}
