import { StateProvider } from "../lib/store";
import "../styles/globals.css";
import "../styles/Components/Button.css";

function HealthApp({ Component, pageProps }) {
  return (
    <StateProvider>
      <Component {...pageProps} />
    </StateProvider>
  );
}

export default HealthApp;
