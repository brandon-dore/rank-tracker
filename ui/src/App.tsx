import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { PageContainer } from "./components/PageContainer/PageContainer";
import { RankTrackerRouter } from "./router";

function App() {
  return (
    <BrowserRouter>
      <PageContainer>
        <RankTrackerRouter />
      </PageContainer>
    </BrowserRouter>
  );
}

export default App;
