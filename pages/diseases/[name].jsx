import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Page from "../../components/Page";
import { NHS_HOST, NHS_SK1 } from "../../lib/keys";

export default function Disease() {
  const router = useRouter();
  const [result, setResult] = useState({});

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
  console.log(result);
  useEffect(() => {
    if (!router.query.name || router.query.name == "") {
      console.log(router);
    }
  });
  return (
    <Page title={result.name || "Loading"}>
      <div className="disease">
        <div className="loading">
            <Loader size={30}/>
        </div>
      </div>
    </Page>
  );
}
