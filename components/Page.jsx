import Head from "next/head";
import { useContext, useEffect } from "react";
import { store } from "../lib/store";
import Header from "./Header";

export default function Page({ title, children }) {
  const { state, dispatch } = useContext(store);

  useEffect(() => {
    if (localStorage) {
      if (state.user.firstname == "") {
        try {
          const user = localStorage.getItem("user");
          const base64String = localStorage.getItem("picture");
          const recent = localStorage.getItem("recent");
          dispatch({
            type: "init",
            payload: {
              user: { ...JSON.parse(user), picture: base64String },
              symptoms: [],
              recent: recent,
            },
          });
        } catch (e) {
          console.log(e);
        }
      }
    }
  }, [state.user]);

  
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
