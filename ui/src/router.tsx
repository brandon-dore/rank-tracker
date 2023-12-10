import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Games } from "./pages/Games";
import { Users } from "./pages/Users";

export const RankTrackerRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/games" element={<Games />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  );
};
