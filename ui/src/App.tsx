import "./App.css"

import { BrowserRouter } from "react-router-dom"
import { RankTrackerRouter } from "./router"
import { PageContainer } from "./components/PageContainer/PageContainer"

function App() {
  return (
    <BrowserRouter>
      <PageContainer>
        <RankTrackerRouter />
      </PageContainer>
    </BrowserRouter>
  )
}

export default App
