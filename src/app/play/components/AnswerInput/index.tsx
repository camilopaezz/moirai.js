import { Question } from '@/types';
import { FC } from 'react';
import { InputState } from '../PlayBox';

type Props = {
  question: Question;
  input: InputState;
  setInput: (newInput: InputState) => void;
};

export const AnswerInput: FC<Props> = ({ input, question, setInput }) => {
  return (
    question.input && (
      <div className="border-b-2 border-green-500">
        <input
          className="h-14 w-full bg-zinc-950 px-4 placeholder:text-green-500 focus:bg-zinc-950"
          value={input[question.input.name]}
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
    )
  );
};
