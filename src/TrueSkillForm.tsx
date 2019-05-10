import React, { useState } from "react";
import { parseVoteData, scoreVotesTrueSkill } from "./rating";

const defaultOptimism = -3;
const defaultSamples = 100;

export const trueSkillInstructions = (
  <>
    <div>
      <b>Optimism</b> controls how much we credit (positive values) or penalize
      (negative values) entries with uncertain scores: controversial entries, or
      entries without many votes. Best to keep this zero or negative. (Details:
      controls how many standard deviations we should add/subtract from the mean
      of each entry's rating distribution to arrive at a final score.)
    </div>
    <div>
      <b>Samples</b> trades off computation time versus the stability of the
      final result. Use a low value for quick approximate answers, a higher
      value for more repeatable ones. (Details: the order in which we run
      "matches" affects the final result. This samples multiple orders and
      averages the results.)
    </div>
  </>
);

export const TrueSkillForm = (props: {
  votes: string;
  setVotes: (votes: string) => void;
  setResult: (result: string) => void;
}) => {
  const [optimism, setOptimism] = useState(defaultOptimism.toString());
  const [samples, setSamples] = useState(defaultSamples.toString());

  return (
    <form
      onSubmit={event => {
        const parsedVotes = parseVoteData(props.votes);
        const scores = scoreVotesTrueSkill(
          parsedVotes,
          parseFloat(optimism),
          parseInt(samples, 10)
        );
        props.setResult(
          scores
            .map((score, index) => `${index + 1}\t${score.score.toFixed(3)}\t${score.id}`)
            .join("\n")
        );
        event.preventDefault();
      }}
    >
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
        <textarea
          id="votes"
          name="votes"
          rows={30}
          cols={60}
          value={props.votes}
          onChange={event => props.setVotes(event.target.value)}
        />
      </div>
      <div>
        <input type="submit" />
      </div>
    </form>
  );
};
