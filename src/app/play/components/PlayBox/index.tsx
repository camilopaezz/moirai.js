'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { PrevValues } from '../../../../types';
import { Questions } from '../../interact/questions';
import { m as motion } from 'framer-motion';
import AnimatedText from '@/components/AnimatedText';
import { submitData } from './action';
import InteractionsList from '../InteractionsList';
import { AnswerInput } from '../AnswerInput';

interface PlayboxProps {
  prevValues: PrevValues;
}

export interface InputState {
  whyBlood: string;
  name: string;
  whatYouDone: string;
  whyKnife: string;
}

const defaultInput: InputState = {
  whyBlood: '',
  name: '',
  whatYouDone: '',
  whyKnife: '',
};

const Playbox: FC<PlayboxProps> = ({ prevValues }) => {
  const questionTree = useRef(new Questions(prevValues));

  const [input, setInput] = useState<InputState>(defaultInput);
  const [hadKill, setHadKill] = useState<boolean>(false);
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
      submitData({
        ...input,
        hadKill,
      });
    }
  }, [question, input, hadKill]);

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
      <AnswerInput input={input} question={question} setInput={setInput} />

      {/* INTERACTIONS */}
      <InteractionsList
        question={question}
        questionTreeRef={questionTree}
        setQuestion={setQuestion}
      />
    </motion.div>
  );
};

export default Playbox;
