import React, { useState } from "react";
import "./App.css";
import { ScoreApp } from "./ScoreApp";
import { AnalyzeApp } from "./AnalyzeApp";

const MODES: {[key: string]: React.FunctionComponent<{}>} = {
  score: ScoreApp,
  analyze: AnalyzeApp
}

const defaultMode = 'score';

const App: React.FC = () => {
  const [mode, setMode] = useState('analyze');

  return (
    <>
      <div>
        This page demonstrates using{" "}
        <a href="https://trueskill.org/">TrueSkill</a> to construct a voting
        system where not every voter has to evaluate every entry. Each voter
        instead ranks every entry they have an opinion about. We can get scores
        (and therefore a consensus ranking) from these inputs by treating each
        voter's ranking as the result of a free-for-all match between all the
        entries they ranked, and use TrueSkill to update entry ratings based on
        the results of each match.
      </div>
      <div>
        Mode:
        { 
          Object.keys(MODES).map(key =>
            <>
        <label><input type="radio" name="mode" value={key} checked={key===mode} onChange={event => setMode(event.target.value)}/>{key}</label>
        </>
          )
        }
      </div>
      {React.createElement(MODES[mode], {})}
      </>
      );
};

export default App;
