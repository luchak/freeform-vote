import { EntryID, EntryRanking, LogisticDistribution, EntryScore, sortScoreDescending, NormalDistribution } from "./rating";

export interface EntryProperties {
    id: EntryID;
    quality: NormalDistribution;
    pListen: number;
} 

function sampleLogistic(dist: LogisticDistribution): number {
    const uniform = Math.random();
    return dist.mu + dist.s * Math.log(uniform / (1 - uniform));
}

function sampleNormal(dist: NormalDistribution): number {
    let x0 = 0;
    let x1 = 0;
    let r = 0;

    while (r <= 0 || r >= 1) {
        x0 = 2 * Math.random() - 1;
        x1 = 2 * Math.random() - 1;
        r = x0 * x0 + x1 * x1;
    }
 
    let s = Math.sqrt((-2 * Math.log(r)) / r);
 
    return dist.mu + Math.sqrt(dist.sigma2) * x1 * s;
}

export function idxToID(idx: number): EntryID {
    let result = '';
    for (;;) {
        let charIdx = idx % 26;
        idx = Math.floor(idx / 26);

        if (result.length > 0) {
            charIdx -= 1;
        }
        result = String.fromCharCode('A'.charCodeAt(0) + charIdx) + result;

        if (idx === 0) {
            break;
        }
    }
    return result;
}

export function genEntries(qualityDist: NormalDistribution, tasteStddev: number, pListenDist: NormalDistribution, numEntries: number): EntryProperties[] {
    const result: EntryProperties[] = [];

    for (let i = 0; i < numEntries; i++) {
        const mu = sampleNormal(qualityDist);
        const entry = { id: idxToID(i), pListen: 0, quality: { mu, sigma2: mu * mu * tasteStddev * tasteStddev } }
        while (entry.pListen <= 0 || entry.pListen > 1) {
            entry.pListen = sampleNormal(pListenDist);
        }
        result.push(entry);
    }

    result.sort((a, b) => b.quality.mu - a.quality.mu);
    // Easier to understand results if IDs are in quality order...
    for (let i = 0; i < result.length; i++) {
        result[i].id = idxToID(i);
    }

    return result;
}

export function simulate(entries: EntryProperties[], numRankings: number, maxRankingLength: number): EntryRanking[] {
    const rankings: EntryRanking[] = [];
    for (let i = 0; i < numRankings; i++) {
        rankings.push(simulateVoter(entries, maxRankingLength));
    }
    return rankings;
}

function simulateVoter(entries: EntryProperties[], maxRankingLength?: number): EntryRanking {
    const voterScores: EntryScore[] = [];


    for (let entry of entries) {
        if (Math.random() < entry.pListen) {
            voterScores.push({id: entry.id, score: sampleNormal(entry.quality)});
            if (maxRankingLength !== undefined && voterScores.length >= maxRankingLength) {
                break;
            }
        }
    }

    sortScoreDescending(voterScores);
    return voterScores.map(score => [score.id]);
}
