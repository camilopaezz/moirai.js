import { Dispatch, FC, MutableRefObject, SetStateAction, useMemo } from 'react';

import { Interaction, Question } from '@/types';
import { Questions } from '../../interact/questions';

interface InteractionListProps {
  question: Question;
  questionTreeRef: MutableRefObject<Questions>;
  setQuestion: Dispatch<SetStateAction<Question>>;
}

const InteractionsList: FC<InteractionListProps> = ({
  question,
  questionTreeRef: questionTree,
  setQuestion,
}) => {
  const filteredInteractions = useMemo(() => {
    const interactions = question.interactions;

    const filtered: Interaction[] = interactions.filter(
      (interaction: Interaction) => {
        return questionTree.current.areRequirementsMet(
          question.key,
          interaction.requires || [],
        );
      },
    );

    return filtered;
  }, [question, questionTree]);

  return (
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
  );
};

export default InteractionsList;
