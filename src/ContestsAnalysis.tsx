import React from "react";
import { EntryRanking, EntryScore } from "./rating";
import { analyzeScoreMethod } from "./analyze";

export const ContestsAnalysis = (props: {
    numEntries: number;
  contests: EntryRanking[][];
  scoreFn: (rankings: EntryRanking[]) => EntryScore[];
}) => {
    const {numEntries, contests, scoreFn} = props;
    const analysis = analyzeScoreMethod(numEntries, contests, scoreFn);
    return <pre>
        {`rank\tcorrect\tavg\tL1 err\tL2 err\n`}
{analysis.map((rank, i) => `${i+1}\t${(rank.contestsCorrectToHere/rank.contests).toFixed(2)}\t${(1 + rank.totalTrueRank/rank.contests).toFixed(2)}\t${(rank.totalTrueRankL1Diff/rank.contests).toFixed(2)}\t${Math.sqrt((rank.totalTrueRankL2Diff/rank.contests)).toFixed(2)}\n`)}
    </pre>
};