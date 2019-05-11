import { EntryRanking, EntryScore, EntryID } from "./rating";
import { idxToID } from "./simulation";

interface RankStats {
  contests: number;
  contestsCorrect: number;
  contestsCorrectToHere: number;
  totalTrueRank: number;
  totalTrueRankL1Diff: number;
  totalTrueRankL2Diff: number;
}

/**
 * Analyze scoring method.
 * @param contests Contest ranking data. Assumes best contestant is lexicographically first.
 */
export function analyzeScoreMethod(
    numEntries: number,
  contests: EntryRanking[][],
  scoreFn: (votes: EntryRanking[]) => EntryScore[]
): RankStats[] {
  const contestScores = contests.map(scoreFn);

  // Maybe should have just passed this in...
  const entryToRank: Map<EntryID, number> = new Map();
  for (let i = 0; i < numEntries; i++) {
      entryToRank.set(idxToID(i), i);
  }

  const rankStats: RankStats[] = [];
  for (let i = 0; i < entryToRank.size; i++) {
    rankStats.push({
      contests: 0,
      contestsCorrect: 0,
      contestsCorrectToHere: 0,
      totalTrueRank: 0,
        totalTrueRankL1Diff: 0,
        totalTrueRankL2Diff: 0
    });
  }

  for (let contestScore of contestScores) {
    analyzeContestResults(rankStats, entryToRank, contestScore);
  }

  const finalRankStats: RankStats[] = [];
  for (let rank of rankStats) {
      if (rank.contests === 0) {
          break
      }
      finalRankStats.push(rank);
  }

  return finalRankStats;
}

export function analyzeContestResults(
  rankStats: RankStats[],
  entryToRank: Map<EntryID, number>,
  scores: EntryScore[]
) {
  let allCorrect = true;
  for (let i = 0; i < scores.length; i++) {
    const score = scores[i];
    const trueRank = entryToRank.get(score.id)!;
    const currentRankStats = rankStats[i];

    currentRankStats.contests += 1;
    if (trueRank === i) {
        currentRankStats.contestsCorrect += 1;
        if (allCorrect) {
            currentRankStats.contestsCorrectToHere += 1;
        }
    } else {
        allCorrect = false;
    }

    currentRankStats.totalTrueRank += trueRank;

    const rankDiff = i - trueRank;
    currentRankStats.totalTrueRankL1Diff += Math.abs(rankDiff);
    currentRankStats.totalTrueRankL2Diff += rankDiff * rankDiff;
  }
}

// for each rank (in final results, not in "true" strength):
// average "true" rank and absolute value of difference
// correct-up-to-rank percentage
// mean absolute rank error up to this rank
