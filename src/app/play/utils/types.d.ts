export interface Input {
  name: string;
}

export interface Question {
  description: string | string[];
  input: Input | null;
  interactions: Interaction[];
  previus: Question | null;
  variables?: { [key: string]: boolean };
}

export interface Interaction {
  description: string;
  dependencies?: string[];
  type: 'GOTO' | 'TALK' | 'SIMPLE';
  action: () => Question;
}
