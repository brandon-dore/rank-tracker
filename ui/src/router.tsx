import { Route, Routes } from "react-router-dom";
import { Home } from "./containers/Home/Home";
import { Games } from "./containers/Games/Games";
import { Users } from "./containers/Users/Users";

export const RankTrackerRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/games" element={<Games />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  );
};
