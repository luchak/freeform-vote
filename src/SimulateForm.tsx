import React, { useState } from "react";
import { EntryRanking } from "./rating";
import { genEntries, simulate } from "./simulation";

const defaultNumEntries = 20;
const defaultNumRankings = 10;
const defaultMeanPListen = 0.5;
const defaultMinPListen = 0.2;
const defaultQualityRange = 1.0;
const defaultTasteStddev = 0.3;
const defaultMaxRankingLength = 5;

function rankingsToText(rankings: EntryRanking[]): string {
    let result = '';
    for (let ranking of rankings) {
        for (let rank of ranking) {
            result += rank.join(' ');
            result += '\n';
        }
        result += '\n';
    }
    return result;
}

export const SimulateForm = (props: {
  setVotes: (votes: string) => void;
}) => {
  const [numEntries, setNumEntries] = useState(defaultNumEntries.toString());
  const [qualityRange, setQualityRange] = useState(defaultQualityRange.toString());
  const [tasteStddev, setTasteStddev] = useState(defaultTasteStddev.toString());
  const [meanPListen, setMeanPListen] = useState(defaultMeanPListen.toString());
  const [minPListen, setMinPListen] = useState(defaultMinPListen.toString());
  const [numRankings, setNumRankings] = useState(defaultNumRankings.toString());
  const [maxRankingLength, setMaxRankingLength] = useState(defaultMaxRankingLength.toString());

  return (
    <form
      onSubmit={event => {
        const qualitySigma = parseFloat(qualityRange);
        const pListenMu = parseFloat(meanPListen);
        const pListenMin = parseFloat(minPListen);
        const pListenSigma = (pListenMu - pListenMin) / 2;
        const entryProperties = genEntries({mu: 0, sigma2: qualitySigma*qualitySigma}, parseFloat(tasteStddev), {mu: pListenMu, sigma2: pListenSigma * pListenSigma}, parseInt(numEntries, 10));
        console.log('------------');
        console.log(entryProperties);
        const rankings = simulate(entryProperties, parseInt(numRankings ,10), parseInt(maxRankingLength, 10));
        console.log(rankings);
        props.setVotes(rankingsToText(rankings));
        event.preventDefault();
      }}
    >
      <div>
        <label>Entry count:</label>
        <input
          type="text"
          id="numEntries"
          name="numEntries"
          value={numEntries}
          onChange={event => setNumEntries(event.target.value)}
        />
      </div>
      <div>
        <label>Quality range (0 to ~3):</label>
        <input
          type="text"
          id="qualityRange"
          name="qualityRange"
          value={qualityRange}
          onChange={event => setQualityRange(event.target.value)}
        />
      </div>
      <div>
        <label>Taste deviation (0 to ~3):</label>
        <input
          type="text"
          id="tasteStddev"
          name="tasteStddev"
          value={tasteStddev}
          onChange={event => setTasteStddev(event.target.value)}
        />
      </div>
      <div>
        <label>Mean listen probability</label>
        <input
          type="text"
          id="meanPListen"
          name="meanPListen"
          value={meanPListen}
          onChange={event => setMeanPListen(event.target.value)}
        />
      </div>
      <div>
        <label>Min listen probability</label>
        <input
          type="text"
          id="minPListen"
          name="minPListen"
          value={minPListen}
          onChange={event => setMinPListen(event.target.value)}
        />
      </div>
      <div>
        <label>Ranking count</label>
        <input
          type="text"
          id="numRankings"
          name="numRankings"
          value={numRankings}
          onChange={event => setNumRankings(event.target.value)}
        />
      </div>
      <div>
        <label>Max ranking length</label>
        <input
          type="text"
          id="maxRankingLength"
          name="maxRankingLength"
          value={maxRankingLength}
          onChange={event => setMaxRankingLength(event.target.value)}
        />
      </div>
      <div>
        <input type="submit" />
      </div>
    </form>
  );
};
