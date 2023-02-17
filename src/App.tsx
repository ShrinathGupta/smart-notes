import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { AppContainer } from "./container/index";
import { connect } from "./db/connect";

const queryClient = new QueryClient();

const App = () => {
  const [isConnectionReady, setIsConnectionReady] = useState(false);

  useEffect(() => {
    const runIndexDb = async () => {
      await connect();
      setIsConnectionReady(true);
    };
    runIndexDb();
  }, []);

  return (
    <div className="App">
      {isConnectionReady === true ? (
        <QueryClientProvider client={queryClient}>
          <AppContainer />
        </QueryClientProvider>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default App;
