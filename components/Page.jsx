import Head from "next/head";
import Header from "./Header";

export default function Page({ title, children }) {
  return (
    <div className="page">
      <Head>
        <title>{title ? title + " | " : ""} Health App</title>
      </Head>
      <Header />
      <div className="page-container">{children}</div>
    </div>
  );
}
