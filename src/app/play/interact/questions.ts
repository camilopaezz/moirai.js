interface Interaction {
  description: string;
  type: string;
  ref: string;
  dispatch?: string[];
  requires?: string[];
}

interface Question {
  key: string;
  content: string[];
  input?: { [name: string]: string };
  variables?: { [key: string]: boolean };
  interactions: Interaction[];
}

import { PrevValues } from '../utils/types';

export class Questions {
  questions: Question[];

  constructor(prevValues: PrevValues) {
    this.questions = getQuestionList(prevValues);
  }

  getQuestion(key: string) {
    return this.questions.find((q) => q.key === key);
  }

  dispatch(questionKey: string, dispatch: string[]) {
    const question = this.getQuestion(questionKey);

    if (!question) return false;

    if (question.variables) {
      console.log('dispatch', dispatch);
      dispatch.forEach((d) => {
        question.variables![d] = true;
      });

      return true;
    }
  }

  areRequirementsMet(questionKey: string, requirements: string[]) {
    const question = this.getQuestion(questionKey);

    if (!question) return false;

    if (question.variables) {
      return requirements.every((r) => question.variables![r]);
    }

    return true;
  }
}

const getQuestionList: (prevValues: PrevValues) => Question[] = () => [
  {
    key: '0000',
    content: ['Welcome to the town'],
    variables: {
      talk_to_priest: false,
    },
    interactions: [
      {
        description: 'Talk to Priest',
        dispatch: ['talk_to_priest'],
        ref: '1100',
        type: 'TALK',
      },
      // {
      //   description: 'Talk to boy',
      //   ref: '1200',
      //   type: 'TALK',
      // },
      {
        description: 'Go to julias house',
        requires: ['talk_to_priest'],
        ref: '1300',
        type: 'GOTO',
      },
    ],
  },
  {
    key: '1100',
    content: ['Hello, I am the priest'],
    interactions: [
      {
        description: 'Back',
        ref: '0000',
        type: 'BACK',
      },
    ],
  },
];
