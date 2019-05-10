import React, { useState } from "react";
import { parseVoteData, scoreVotesByPoints } from "./rating";

const defaultRankPoints = "3,2,1";

export const pointsInstructions = (
  <>
    <div>
      <b>Points by rank</b> is how many points mixes get for each time they are
      listed at each rank, in descending order. So the default value of "3,2,1"
      means that first place gets 3 points, second gets 2, etc. Ties are split
      equally, so 2 mixes tied for first/second with the default 3,2,1 scoring
      each get 2.5 points.
    </div>
  </>
);

export const PointsForm = (props: {
  votes: string;
  setVotes: (votes: string) => void;
  setResult: (result: string) => void;
}) => {
  const [rankPoints, setRankPoints] = useState(defaultRankPoints.toString());

  return (
    <form
      onSubmit={event => {
        const rankPointsList = rankPoints
          .split(",")
          .map(item => parseFloat(item.trim()));
        const parsedVotes = parseVoteData(props.votes);
        const scores = scoreVotesByPoints(parsedVotes, rankPointsList);
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
