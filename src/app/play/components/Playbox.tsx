'use client';

import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { PrevValues } from '../../../types';
import { Questions } from '../interact/questions';
import { m as motion } from 'framer-motion';
import AnimatedText from '@/components/AnimatedText';
import { submitData } from './action';
import InteractionsList from './InteractionsList';

interface PlayboxProps {
  prevValues: PrevValues;
}

interface InputState {
  whyBlood: string;
  name: string;
  whatYouDone: string;
  whyKnife: string;
}

const Playbox: FC<PlayboxProps> = ({ prevValues }) => {
  const questionTree = useRef(new Questions(prevValues));
  const formRef = useRef<HTMLFormElement>(null);

  const [input, setInput] = useState<InputState>({
    whyBlood: '',
    name: '',
    whatYouDone: '',
    whyKnife: '',
  });

  const [hadKill, setHadKill] = useState<Boolean>();

  const [question, setQuestion] = useState(
    questionTree.current.getQuestion('0000')!,
  );

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
      formRef.current?.requestSubmit();
    }
  }, [question]);

  return (
    <motion.div
      layout
      transition={{ duration: 0.06 }}
      className="mx-auto max-w-[900px] rounded-xl border-2 border-green-500"
    >
      <div className="border-b-2 border-green-500 p-4 text-justify">
        <AnimatedText text={question.content} />
      </div>

      {/* TEXT INPUT */}
      {question.input && (
        <div className="border-b-2 border-green-500">
          <input
            className="h-14 w-full bg-zinc-950 px-4 placeholder:text-green-600 focus:bg-zinc-950"
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
      <InteractionsList
        question={question}
        questionTreeRef={questionTree}
        setQuestion={setQuestion}
      />

      <form aria-hidden hidden ref={formRef} action={submitData}>
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
    </motion.div>
  );
};

export default Playbox;
