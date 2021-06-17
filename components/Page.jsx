import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { man_image, woman_image } from "../lib/constants";
import { store } from "../lib/store";
import Header from "./Header";
import { Splash } from "./SplashScreen";
import styles from "../styles/Components/Page.module.css";

export default function Page({ title, children }) {
  const { state, dispatch } = useContext(store);
  
  useEffect(() => {
      return setTimeout(() => dispatch({ type: "loading", payload: false }), 1500);
  },[state.loading]);

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
              user: {
                ...JSON.parse(user),
                picture: base64String
                  ? base64String
                  : user && user.sex == "Female"
                  ? woman_image
                  : man_image,
              },
              symptoms: [],
              recent: recent,
              loading: state.loading,
            },
          });
        } catch (e) {
          console.log(e);
        }
      }
    }
  }, [state.user]);

  return state.loading ? (
    <Splash />
  ) : (
    <div className={styles.page} id="top">
      <Head>
        <title>{title ? title + " | " : ""}Health App</title>
      </Head>
      <Header />
      <div className={styles.pagecontainer}>{children}</div>
    </div>
  );
}
