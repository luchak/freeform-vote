import React, { useState } from "react";
import { EntryRanking, scoreVotesByPoints, scoreVotesByAveragePoints, scoreVotesTrueSkill } from "./rating";
import { Form } from "./Form";
import { genEntries, simulate } from "./simulation";
import { ContestsAnalysis } from "./ContestsAnalysis";

export const AnalyzeApp: React.FC = () => {
  const [contests, setContests] = useState<EntryRanking[][]>([]);
  const [pointsParams, setPointsParams] = useState<{ pointsByRank: number[] }>({
    pointsByRank: []
  });
  const [avgPointsParams, setAvgPointsParams] = useState({ smoothing: 0 });
  const [tsParams, setTSParams] = useState({ optimism: -3, numSamples: 10 });
  const [numEntries, setNumEntries] = useState(0);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "300px 25% 25% 25%" }}>
      <div>
        <h3>Parameters</h3>
        <Form
          onSubmit={values => {
            const contests: EntryRanking[][] = [];
            for (let i = 0; i < parseInt(values.numContests, 10); ++i) {
              const entries = genEntries(
                { mu: 0, sigma2: 1 },
                parseFloat(values.tasteDeviation),
                {
                  mu: parseFloat(values.pListenMean),
                  sigma2: parseFloat(values.pListenStddev) ** 2
                },
                parseInt(values.numEntries, 10)
              );
              const rankings = simulate(
                entries,
                parseInt(values.numRankings, 10),
                parseInt(values.maxRankingLength, 10)
              );
              contests.push(rankings);
            }
            setPointsParams({
              pointsByRank: values.pointsByRank
                .split(",")
                .map(value => parseFloat(value))
            });
            setAvgPointsParams({ smoothing: parseFloat(values.smoothing) });
            setTSParams({
              optimism: parseFloat(values.optimism),
              numSamples: parseInt(values.numTSSamples, 10)
            });
            setNumEntries(parseInt(values.numEntries, 10));
            setContests(contests);
          }}
          inputs={{
            // Analysis params
            numContests: {
              order: -1,
              label: "Number of contests",
              defaultValue: "100"
            },
            // Voting input sim params
            numEntries: {
              order: 0,
              label: "Number of entries",
              defaultValue: "40"
            },
            tasteDeviation: {
              order: 1,
              label: "Taste deviation",
              defaultValue: "0.3"
            },
            pListenMean: {
              order: 2,
              label: "Listen probability mean",
              defaultValue: "0.5"
            },
            pListenStddev: {
              order: 3,
              label: "Listen probability stddev",
              defaultValue: "0.2"
            },
            numRankings: {
              order: 4,
              label: "Number of rankings",
              defaultValue: "20"
            },
            maxRankingLength: {
              order: 5,
              label: "Max ranking length",
              defaultValue: "5"
            },
            // points (and avg points) params
            pointsByRank: {
              order: 6,
              label: "Points by rank",
              defaultValue: "5,4,3,2,1"
            },
            // avg points params
            smoothing: {
              order: 7,
              label: "Average points smoothing",
              defaultValue: "1"
            },
            // Trueskill params
            optimism: {
              order: 8,
              label: "TS Optimism",
              defaultValue: "-3"
            },
            numTSSamples: {
              order: 9,
              label: "TS Sample count",
              defaultValue: "1"
            }
          }}
        />
      </div>
      <div>
        <h3>Points</h3>
        <ContestsAnalysis
        numEntries={numEntries}
          contests={contests}
          scoreFn={(votes: EntryRanking[]) =>
            scoreVotesByPoints(votes, pointsParams.pointsByRank)
          }
        />
      </div>
      <div>
        <h3>Average Points</h3>
        <ContestsAnalysis
        numEntries={numEntries}
          contests={contests}
          scoreFn={(votes: EntryRanking[]) =>
            scoreVotesByAveragePoints(votes, pointsParams.pointsByRank, avgPointsParams.smoothing)
          }
        />
      </div>
      <div>
        <h3>TrueSkill</h3>
        <ContestsAnalysis
        numEntries={numEntries}
          contests={contests}
          scoreFn={(votes: EntryRanking[]) =>
            scoreVotesTrueSkill(votes, tsParams.optimism, tsParams.numSamples)
          }
        />
      </div>
    </div>
  );
};
