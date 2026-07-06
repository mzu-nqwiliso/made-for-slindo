import { useEffect, useState } from "react";
import Loader from "./components/Loader/Loader.jsx";
import MainContent from "./sections/MainContent/MainContent.jsx";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loaderTimer = window.setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => window.clearTimeout(loaderTimer);
  }, []);

  return isLoading ? <Loader /> : <MainContent />;
}

export default App;
