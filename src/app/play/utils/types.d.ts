export interface Input {
  name: string;
}

export interface Question {
  description: string | string[];
  input: Input | null;
  interactions: Interaction[];
  previus: Question | null;
  variables?: { [key: string]: boolean };
  prevValues?: PrevValues;
}

export interface PrevValues {
  whyBlood: string[] | string;
  whyKnife: string[] | string;
  whatYouDone: string[] | string;
  name: string;
}

export interface Interaction {
  description: string;
  dependencies?: string[];
  type: 'GOTO' | 'TALK' | 'SIMPLE';
  action: () => Question;
}
