import { StateProvider } from "../lib/store";
import "../styles/globals.css";

function HealthApp({ Component, pageProps }) {
  return (
    <StateProvider>
      <Component {...pageProps} />
    </StateProvider>
  );
}

export default HealthApp;
