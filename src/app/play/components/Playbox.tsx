'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Question } from '../utils/types';
import { p100 } from '../interact/p100';

const Playbox = () => {
  const [question, setQuestion] = useState<Question>(p100);

  const filterInteractions = question.interactions.filter((interaction) => {
    if (interaction.dependencies) {
      return interaction.dependencies.every(
        (dependency) => question.variables![dependency],
      );
    }

    return true;
  });

  return (
    <div className="rounded-xl border-2 border-green-500">
      {/* TITLE */}
      <div className="border-b-2 border-green-500 p-4 text-justify">
        {Array.isArray(question.description) ? (
          question.description.map((desc, index) => <h2 key={index}>{desc}</h2>)
        ) : (
          <h2>{question.description}</h2>
        )}
      </div>

      {/* LOGS
      <div className="m-4 h-48 overflow-x-hidden overflow-y-scroll rounded-xl bg-zinc-900 p-2">
        <p>dexas</p>
      </div> */}

      {/* TEXT INPUT */}
      {question.input && (
        <div className="border-b-2 border-green-500">
          <input
            className="h-14 w-full bg-zinc-950 px-4 placeholder:text-green-600"
            placeholder="your answer here..."
            type="text"
          />
        </div>
      )}

      {/* INTERACTIONS */}
      <div className="w-full">
        {filterInteractions.map((interaction) => (
          <div
            key={interaction.description}
            onClick={() => setQuestion(interaction.action())}
            className="flex h-12 cursor-pointer items-center px-4 hover:underline"
          >
            <span>
              ~ {`[${interaction.type}]`} {interaction.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playbox;
