'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { PrevValues } from '../utils/types';
import { Questions } from '../interact/questions';

interface PlayboxProps {
  prevValues: PrevValues;
  sendAction: (e: any) => void;
}

interface Input {
  [key: string]: string;
}

const Playbox = ({ prevValues, sendAction }: PlayboxProps) => {
  const questionTree = useRef(new Questions(prevValues));
  const formRef = useRef<HTMLFormElement>(null);

  const [input, setInput] = useState<Input>({});
  const [hadKill, setHadKill] = useState<Boolean>();

  const [question, setQuestion] = useState(
    questionTree.current.getQuestion('0000')!,
  );

  const filteredInteractions = useMemo(() => {
    const interactions = question.interactions;

    const filtered = interactions.filter((interaction) => {
      return questionTree.current.areRequirementsMet(
        question.key,
        interaction.requires || [],
      );
    });

    return filtered;
  }, [question]);

  useEffect(() => {
    if (question.key === '6000_kill') {
      setHadKill(true);
    }

    if (question.key === '6000_let_go') {
      setHadKill(false);
    }
  }, [question]);

  useEffect(() => {
    if (question.key === 'END') {
      formRef.current?.submit();
    }
  }, [question]);

  return (
    <div className="mx-auto max-w-[900px] rounded-xl border-2 border-green-500">
      {/* TITLE */}
      <div className="border-b-2 border-green-500 p-4 text-justify">
        {question.content &&
          question.content.map((desc, index) => <h2 key={index}>{desc}</h2>)}
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
            name={question.input.name}
            onChange={(e) =>
              setInput({
                ...input,
                [question.input!.name]: e.target.value,
              })
            }
            placeholder="your answer here..."
            type="text"
          />
        </div>
      )}

      {/* INTERACTIONS */}
      <div className="w-full">
        {filteredInteractions.map((interaction) => (
          <div
            key={interaction.description}
            onClick={() => {
              questionTree.current.dispatch(
                question.key,
                interaction.dispatch || [],
              );
              setQuestion(questionTree.current.getQuestion(interaction.ref)!);
            }}
            className="flex h-12 cursor-pointer items-center px-4 hover:underline"
          >
            <span>
              ~ {`[${interaction.type}]`} {interaction.description}
            </span>
          </div>
        ))}
      </div>
      <form hidden ref={formRef} action={sendAction}>
        <input
          readOnly
          type="text"
          name="why_blood"
          value={input.whyBlood || ''}
        />
        <input readOnly type="text" name="name" value={input.name || ''} />
        <input
          readOnly
          type="text"
          name="what_you_done"
          value={input.whatYouDone || ''}
        />
        <input
          readOnly
          type="text"
          name="why_knife"
          value={input.whyKnife || ''}
        />
        <input
          readOnly
          type="checkbox"
          name="hasKilled"
          value={`${hadKill || 'false'}`}
        />
      </form>
    </div>
  );
};

export default Playbox;
