import { Question } from './types';

export function createQuestion({
  description,
  input,
  interactions,
  variables,
  previus,
}: Question): Question {
  if (previus) {
    interactions.push({
      description: 'Back',
      type: 'GOTO',
      action: () => previus!,
    });
  }

  return {
    description,
    input,
    interactions,
    previus,
    variables,
  };
}
