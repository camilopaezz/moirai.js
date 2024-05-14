import { createQuestion } from '../utils/createQuestion';

export const p200 = createQuestion({
  description: 'You are at the farm',
  input: null,
  previus: null,
  variables: {
    beee: false,
    talkToWoodcutter: false,
  },
  interactions: [
    {
      description: 'Talk to goat',
      type: 'TALK',
      action: () => {
        p200.variables!.beee = true;
        return p201;
      },
    },
    {
      description: 'Talk to woodcutter',
      type: 'TALK',
      dependencies: ['beee'],
      action: () => {
        p200.variables!.talkToWoodcutter = true;
        return p202;
      },
    },
  ],
});

// Talk to goat
const p201 = createQuestion({
  description: 'Goat: Beeee',
  input: null,
  previus: p200,
  interactions: [],
});

// Talk to woodcutter
const p202 = createQuestion({
  description: [
    'Woodcutter: My brother and I were chopping wood when we heard moans coming from the cave. My brother went in to investigate.',
    "He should have been back by now. I'm worried. Can you check on him?",
  ],
  input: null,
  previus: p200,
  interactions: [],
});
