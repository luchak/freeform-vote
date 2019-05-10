import { rate, Rating } from "ts-trueskill";

export type EntryID = string;

export type EntryRanking = EntryID[][];
type RatingGroup = Rating[];
export type LogisticDistribution = { mu: number; s: number };
export type NormalDistribution = { mu: number; sigma2: number };
export type EntryScore = { id: EntryID; score: number };

function* zip<T, U>(a: T[], b: U[]): IterableIterator<[T, U]> {
  const minLength = Math.min(a.length, b.length);
  for (let i = 0; i < minLength; ++i) {
    yield [a[i], b[i]];
  }
}

function shuffle<T>(array: T[]): T[] {
  array = array.slice();

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

export function sortScoreDescending(scores: EntryScore[]): EntryScore[] {
  return scores.sort((a, b) => b.score - a.score);
}

export function parseVoteData(data: string): EntryRanking[] {
  const rankings: EntryRanking[] = [];

  data = data.trim();
  data = data.replace("\r\n", "\n");
  data = data.replace(/\n[ \t\n]+\n/g, "\n\n");
  data = data.replace(/[ \t]+/g, " ");

  const stringRankings = data.split("\n\n");
  for (let stringRanking of stringRankings) {
    const ranking: EntryRanking = [];
    for (let stringRankGroup of stringRanking.split("\n")) {
      stringRankGroup = stringRankGroup.trim();
      const rankGroup = stringRankGroup.split(" ");
      if (rankGroup.length === 0) {
        throw new Error("0 length rank group found");
      }
      ranking.push(rankGroup);
    }
    if (ranking.length > 1) {
      rankings.push(ranking);
    } else {
      console.warn("Ignoring too-short ranking:", ranking);
    }
  }

  return rankings;
}

export function distributionsToScores(
  distributions: Map<EntryID, NormalDistribution>,
  optimism: number,
  normFactor: number
): EntryScore[] {
  const scores: EntryScore[] = [];
  for (let [id, distribution] of distributions.entries()) {
    const normalizedMu = distribution.mu / normFactor;
    const normalizedSigma = Math.sqrt(distribution.sigma2 / normFactor);
    const score = normalizedMu + optimism * normalizedSigma;
    scores.push({ id, score });
  }
  return scores;
}

export function scoreVotesByPoints(
  votes: EntryRanking[],
  pointsByRank: number[]
): EntryScore[] {
  const scoreMap: Map<EntryID, number> = new Map();

  for (let ranking of votes) {
    let place = 0;
    for (let rankEntries of ranking) {
      let rankPoints = 0;
      for (let i = 0; i < rankEntries.length; i++) {
        rankPoints += pointsByRank[place++] || 0;
      }
      const delta = rankPoints / rankEntries.length;
      for (let id of rankEntries) {
        let currentScore = scoreMap.get(id) || 0;
        currentScore += delta;
        scoreMap.set(id, currentScore);
      }
    }
  }

  const scores: EntryScore[] = [];
  for (let [id, score] of scoreMap.entries()) {
    scores.push({ id, score });
  }

  return sortScoreDescending(scores);
}

export function scoreVotesByAveragePoints(
  votes: EntryRanking[],
  pointsByRank: number[],
  smoothing: number
): EntryScore[] {
  const scoreMap: Map<EntryID, number> = new Map();
  const countMap: Map<EntryID, number> = new Map();

  for (let ranking of votes) {
    let place = 0;
    for (let rankEntries of ranking) {
      let rankPoints = 0;
      for (let i = 0; i < rankEntries.length; i++) {
        rankPoints += pointsByRank[place++] || 0;
      }
      const delta = rankPoints / rankEntries.length;
      for (let id of rankEntries) {
        let currentScore = scoreMap.get(id) || 0;
        let currentCount = countMap.get(id) || smoothing;
        currentScore += delta;
        currentCount += 1;
        scoreMap.set(id, currentScore);
        countMap.set(id, currentCount);
      }
    }
  }

  const scores: EntryScore[] = [];
  for (let [id, score] of scoreMap.entries()) {
    scores.push({ id, score: score / countMap.get(id)! });
  }

  return sortScoreDescending(scores);
}

export function scoreVotesTrueSkill(
  votes: EntryRanking[],
  optimism: number,
  samples: number
): EntryScore[] {
  const accumulatedDistributions: Map<EntryID, NormalDistribution> = new Map();
  for (let i = 0; i < samples; ++i) {
    const contest = new Contest();
    for (let ranking of shuffle(votes)) {
      contest.update(ranking);
    }
    contest.accumulateRatings(accumulatedDistributions);
  }

  const scores = distributionsToScores(
    accumulatedDistributions,
    optimism,
    samples
  );

  return sortScoreDescending(scores);
}

export default class Contest {
  private _ratings: Map<EntryID, Rating>;

  public constructor(
    private _defaultMu?: number,
    private _defaultSigma?: number
  ) {
    this._ratings = new Map();
  }

  public accumulateRatings(
    accumulator: Map<EntryID, NormalDistribution>
  ): void {
    for (let [id, rating] of this._ratings.entries()) {
      let oldDistribution = accumulator.get(id);
      const newDistribution = {
        mu: rating.mu,
        sigma2: rating.sigma * rating.sigma
      };
      if (oldDistribution) {
        newDistribution.mu += oldDistribution.mu;
        newDistribution.sigma2 += oldDistribution.sigma2;
      }
      accumulator.set(id, newDistribution);
    }
  }

  public addEntry(id: EntryID, mu?: number, sigma?: number): Rating {
    const newRating = new Rating(
      mu || this._defaultMu,
      sigma || this._defaultSigma
    );
    this._ratings.set(id, newRating);
    return newRating;
  }

  public update(ranking: EntryRanking) {
    const ratingGroups = this._rankingToRatingGroups(ranking);
    const newRatingGroups = rate(ratingGroups);
    this._updateRatings(ranking, newRatingGroups);
  }

  private _rankingToRatingGroups(ranking: EntryRanking) {
    const groups: RatingGroup[] = [];

    for (let rankGroup of ranking) {
      const group: RatingGroup = [];
      for (let id of rankGroup) {
        let rating = this._ratings.get(id);
        if (!rating) {
          rating = this.addEntry(id);
        }
        group.push(rating);
      }
      groups.push(group);
    }

    return groups;
  }

  private _updateRatings(
    ranking: EntryRanking,
    newRatingGroups: RatingGroup[]
  ) {
    for (let [rankGroup, ratingGroup] of zip(ranking, newRatingGroups)) {
      for (let [id, rating] of zip(rankGroup, ratingGroup)) {
        this._ratings.set(id, rating);
      }
    }
  }
}
