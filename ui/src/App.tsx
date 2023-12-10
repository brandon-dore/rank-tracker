import { BrowserRouter } from "react-router-dom";
import { PageContainer } from "./layouts/PageContainer";
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
