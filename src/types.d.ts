export interface PrevValues {
  whyBlood: string[] | string;
  whyKnife: string[] | string;
  whatYouDone: string[] | string;
  name: string;
}

export interface Interaction {
  description: string;
  type: string;
  ref: string;
  dispatch?: string[];
  requires?: string[];
}

export interface Question {
  key: string;
  content: string[];
  input?: { name: string };
  variables?: any;
  interactions: Interaction[];
}
