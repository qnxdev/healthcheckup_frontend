import { useEffect, useState } from "react";
import Page from "../../components/Page";
import { NHS_HOST, NHS_SK1 } from "../../lib/keys";
import { Button } from "../../components/Button";
import styles from "../../styles/Pages/Diseases.module.css";
import Loader from "../../components/Loader";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Diseases() {
  const router= useRouter()
  const [result, setResult] = useState({});
  const [url, setUrl] = useState("");
  const [previousUrl, setPreviousUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const Fetcher = async () => {
    try {
      const res = await fetch(
        url != ""
          ? url
          : `${NHS_HOST}conditions/?subscription-key=${NHS_SK1}&synonyms=false&childArticles=false&status=all`
      );
      setResult(await res.json());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!result.name) {
      setLoading(true);
      Fetcher();
    } else {
      if (loading && url == "") setLoading(false);
    }
    if(url != "" && url==result.relatedLink[2].url) setLoading(false)
  });
  useEffect(() => {
    setLoading(true);
    Fetcher();
    router.push("#top")
  }, [url]);

  return (
    <Page title="All Diseases | Health App">
      <h2 >All diseases</h2>
      <br />
      <div className={styles.alldiseases}>
        {!result.significantLink && (
          <h4>{loading ? <Loader size={50} /> : "Failed to load"}</h4>
        )}
        {result.significantLink &&
          result.significantLink.map((item, index) => (
            <Link
              key={index}
              href={`/diseases/${item.url.replace(
                "https://api.nhs.uk/conditions/",
                ""
              )}`}
            >
              <a
                onClick={() => {
                  setUrl(item.url);
                }}
              >
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </a>
            </Link>
          ))}
      </div>
      <div className={styles.navigate}>
        <Button
          inverted
          onClick={() => {
            if (previousUrl != "") {
              setUrl(previousUrl);
              setPreviousUrl("");
            }
          }}
        >
          Previous Page
        </Button>
        <Button
          onClick={() => {
            setPreviousUrl(result.relatedLink[2].url);
            setUrl(result.relatedLink[3].url);
          }}
        >
          Next Page
        </Button>
      </div>
    </Page>
  );
}
