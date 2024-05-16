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
      talk_to_mother: false,
      talk_to_girl: false,
    },
    interactions: [
      {
        description: 'Talk to Priest',
        dispatch: ['talk_to_priest'],
        ref: '1100',
        type: 'TALK',
      },
      {
        description: 'Talk to boy',
        ref: '1200',
        type: 'TALK',
      },
      {
        description: 'Talk to Mother',
        dispatch: ['talk_to_mother'],
        ref: '1300',
        type: 'TALK',
      },
      {
        description: "Go to Julia's house",
        requires: ['talk_to_priest'],
        ref: '1400',
        type: 'GOTO',
      },
      {
        description: 'Go to woodcutters house',
        ref: '1500',
        type: 'GOTO',
      },
      {
        description: 'Go to the farm',
        ref: '2000',
        type: 'GOTO',
        requires: ['talk_to_mother', 'talk_to_priest'],
      },
    ],
  },
  {
    key: '1100',
    content: [
      "Priest: My prayers go out to poor Julia. It's been a year since her husband has passed. She hasn't been seen all day.",
      "I imagine she is grieving. Do you mind visiting her at her home? It's the house to the right as you leave town.",
    ],
    interactions: [
      {
        description: 'Back',
        ref: '0000',
        type: 'BACK',
      },
    ],
  },
  {
    key: '1200',
    content: [
      "Boy: Need to stay close to Momma otherwise she'll worry that we've run off.",
    ],
    interactions: [
      {
        description: 'Back',
        ref: '0000',
        type: 'BACK',
      },
    ],
  },
  {
    key: '1300',
    content: [
      'Mother: Did you hear about the boy? Julia lost her son in the cave shortly after her husband died. Poor Julia.',
      'I would never let my boys out of my sight.',
    ],
    interactions: [
      {
        description: 'Back',
        ref: '0000',
        type: 'BACK',
      },
    ],
  },
  {
    key: '1400',
    content: [
      'There is a picture on the sheld of a wife, husband and a young boy. I wonder where they are.',
    ],
    interactions: [
      {
        description: 'Back',
        ref: '0000',
        type: 'BACK',
      },
    ],
  },
  {
    key: '1500',
    content: [
      'You are at the woodcutters house. You see a girl sitting on the porch.',
    ],
    interactions: [
      {
        description: 'Talk to girl',
        ref: '1510',
        type: 'TALK',
        dispatch: ['talk_to_girl'],
      },
      {
        description: 'Back',
        ref: '0000',
        type: 'BACK',
      },
    ],
  },
  {
    key: '1510',
    content: [
      'My uncle and dad are out chopping wood to keep us warn in the winter. They should be home soon.',
    ],
    interactions: [
      {
        description: 'Back',
        ref: '1500',
        type: 'BACK',
      },
    ],
  },
];
