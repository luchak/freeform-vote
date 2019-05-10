import React, { useState } from "react";
import { parseVoteData, scoreVotesByAveragePoints } from "./rating";

const defaultRankPoints = "5,4,3,2,1";
const defaultSmoothing = 1;

export const averagePointsInstructions = (
  <>
    <div>
      <b>Points by rank</b> is how many points entries get for each time they
      are listed at each rank, in descending order. So the default value of
      "3,2,1" means that first place gets 3 points, second gets 2, etc. Ties are
      split equally, so 2 entries tied for first/second with the default 3,2,1
      scoring each get 2.5 points.
    </div>
    <div>
      <b>Smoothing</b> helps to stabilize (and reduce) the scores of mixes with
      a small number of rankings. If smoothing is 1, each mix is treated as
      though there were 1 extra ranking where it appeared rated too low to
      receive any points.
    </div>
  </>
);

export const AveragePointsForm = (props: {
  votes: string;
  setVotes: (votes: string) => void;
  setResult: (result: string) => void;
}) => {
  const [rankPoints, setRankPoints] = useState(defaultRankPoints.toString());
  const [smoothing, setSmoothing] = useState(defaultSmoothing.toString());

  return (
    <form
      onSubmit={event => {
        const rankPointsList = rankPoints
          .split(",")
          .map(item => parseInt(item.trim(), 10));
        const parsedVotes = parseVoteData(props.votes);
        const scores = scoreVotesByAveragePoints(
          parsedVotes,
          rankPointsList,
          parseFloat(smoothing)
        );
        props.setResult(
          scores
            .map(
              (score, index) =>
                `${index + 1}\t${score.score.toFixed(3)}\t${score.id}`
            )
            .join("\n")
        );
        event.preventDefault();
      }}
    >
      <div>
        <label>Points by rank:</label>
        <input
          type="text"
          id="rankPoints"
          name="rankPoints"
          value={rankPoints}
          onChange={event => setRankPoints(event.target.value)}
        />
      </div>
      <div>
        <label>Smoothing:</label>
        <input
          type="text"
          id="smoothing"
          name="smoothing"
          value={smoothing}
          onChange={event => setSmoothing(event.target.value)}
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
