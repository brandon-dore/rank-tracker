import { useState } from "react";
import { useGames } from "./Games.logic";
import { Game } from "../../types/types";

import "./Games.css";

export const Games = () => {
  const { getGames, loading } = useGames();
  const [games, setGames] = useState<Game[]>();
  const [id, setId] = useState<string | undefined>();

  const handleGetGames = (id?: string) => {
    getGames(id).then((response) => {
      setGames(response);
    });
  };

  return (
    <div className="pageContainer">
      <h1>Games</h1>
      <div className="actionsContainer">
        <div className="inputContainer">
          <input type="text" onChange={(event) => setId(event.target.value)} />
          <button disabled={!id} onClick={() => handleGetGames(id)}>
            Get Game
          </button>
        </div>
        <div>
          <button onClick={() => handleGetGames()}>Get games</button>
        </div>
      </div>
      <br />
      {loading ? (
        "Loading"
      ) : games ? (
        <p>
          Games:
          {JSON.stringify(games)}
        </p>
      ) : (
        <p>Game not found</p>
      )}
    </div>
  );
};
