import React, { useState } from "react";
import "./App.css";
import { scoreVotes, parseVoteData } from "./rating";

const defaultOptimism = -3;
const defaultSamples = 100;
const sampleVotes = `Asiago Brie
Cheddar

Brie Cheddar
Asiago

Asiago
Brie

Cheddar
Asiago
DanishBlue

Brie
Asiago
Cheddar

Brie
DanishBlue
Asiago
Cheddar

`;

const App: React.FC = () => {
  const [optimism, setOptimism] = useState(defaultOptimism.toString());
  const [samples, setSamples] = useState(defaultSamples.toString());
  const [votes, setVotes] = useState(sampleVotes);
  const [result, setResult] = useState<string | null>(null);

  return (
    <>
      <div>Provide rankings, get scores!</div>
      <div>&nbsp;</div>
      <div>This page demonstrates using <a href="https://trueskill.org/">TrueSkill</a> to construct a voting system where
      not every voter has to evaluate every entry. Each voter instead ranks every entry they have an opinion about.
      We can get scores (and therefore a consensus ranking) from these inputs by treating each voter's ranking as the
      result of a free-for-all match between all the entries they ranked, and use TrueSkill to update entry ratings
      based on the results of each match.</div>
      <div>
        <h3>Instructions</h3>
      </div>
      <div>
        <b>Votes:</b> each block of lines below is an individual voter's ranking. Entries
        that come first are ranked higher, entries appearing on the same line are
        ties. For example: in the default rankings in the box below, the first user
        has ranked Asiago and Brie tied for first, with Cheddar coming in
        second. The second user ranked Brie and Cheddar first, and Asiago
        second.
      </div>
      <div>
        <b>Optimism</b> controls how much we credit (positive values) or
        penalize (negative values) entries with uncertain scores: controversial
        entries, or entries without many votes. Best to keep this zero or
        negative. (Details: controls how many standard deviations we should
        add/subtract from the mean of each entry's rating distribution to arrive
        at a final score.)
      </div>
      <div>
        <b>Samples</b> trades off computation time versus the stability of the
        final result. Use a low value for quick approximate answers, a higher
        value for more repeatable ones. (Details: the order in which we run "matches" affects the final result. This
        samples multiple orders and averages the results.)
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '50% 50%'}}>
      <div>
      <div>
        <h3>Inputs</h3>
      </div>
      <div>
        <form onSubmit={(event) => {
          const parsedVotes = parseVoteData(votes);
          console.log('---');
          console.log(parsedVotes);
          console.log('---');
          const scores = scoreVotes(parsedVotes, parseInt(optimism, 10), parseInt(samples, 10));
          setResult(scores.map((score, index) => `${index + 1}\t${score.score}\t${score.id}`).join('\n'));
          console.log(result);
          event.preventDefault();
        }
        }>
          <div>
            <label>Optimism (-3 to -2 seems ideal):</label>
            <input
              type="text"
              id="optimism"
              name="optimism"
              value={optimism}
              onChange={event => setOptimism(event.target.value)}
            />
          </div>
          <div>
            <label>Samples (1 to 10000):</label>
            <input
              type="number"
              id="epochs"
              name="epochs"
              min="1"
              max="10000"
              value={samples}
              onChange={event => setSamples(event.target.value)}
            />
          </div>
          <div>
            <label>Votes:</label>
          </div>
          <div>
            <textarea id="votes" name="votes" rows={30} cols={60} value={votes} onChange={event => setVotes(event.target.value)}/>
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
      </div>
      <div>
        <h3>Results</h3>
        {
          result && <pre>{result}</pre>
        }
      </div>
      </div>
    </>
  );
};

export default App;
