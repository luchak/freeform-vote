import React, { useState } from "react";
import { TrueSkillForm, trueSkillInstructions } from "./TrueSkillForm";
import { PointsForm, pointsInstructions } from "./PointsForm";
import {
  AveragePointsForm,
  averagePointsInstructions
} from "./AveragePointsForm";
import { SimulateForm } from "./SimulateForm";

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

const FORMS = {
  averagePoints: {
    form: AveragePointsForm,
    instructions: averagePointsInstructions
  },
  points: { form: PointsForm, instructions: pointsInstructions },
  trueSkill: { form: TrueSkillForm, instructions: trueSkillInstructions }
};

export const ScoreApp: React.FC = () => {
  const [votes, setVotes] = useState(sampleVotes);
  const [result, setResult] = useState<string | null>(null);
  const [method, setMethod] = useState<keyof typeof FORMS>("trueSkill");

  const { form, instructions } = FORMS[method];

  return (
    <>
      <div>
        <h3>Instructions</h3>
      </div>
      <div>
        <b>Votes:</b> each block of lines below is an individual voter's
        ranking. Entries that come first are ranked higher, entries appearing on
        the same line are ties. For example: in the default rankings in the box
        below, the first user has ranked Asiago and Brie tied for first, with
        Cheddar coming in second. The second user ranked Brie and Cheddar first,
        and Asiago second.
      </div>
      {instructions}
      <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
        <div>
          <div>
            <h3>Inputs</h3>
          </div>
          <div>
            <label>Method:</label>
            <select
              value={method}
              onChange={event =>
                setMethod(event.target.value as (keyof typeof FORMS))
              }
            >
              {Object.keys(FORMS).map(key => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
          {
            // TODO: setResult is the wrong thing to pass here, since it duplicates result formatting in all the form
            // classes. Should just pass a function to get the raw scores instead and do presentation here. Also, maybe
            // it would be better to pass the textarea as a child and have the forms render children?
          }
          <div>{React.createElement(form, { votes, setVotes, setResult })}</div>
        </div>
        <div>
          <h3>Results</h3>
          {result && <pre>{result}</pre>}
        </div>
      </div>
      <h3>Simulate voting</h3>
      <SimulateForm setVotes={setVotes} />
    </>
  );
};
