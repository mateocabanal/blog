import "../styles/globals.css";

import {useLocalStorage, useTheme } from "../lib/themeState";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useTheme();
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme]);
  return (
    <Component {...pageProps} />
  );
}

export default MyApp;
