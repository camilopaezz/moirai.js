import { createQuestion } from '../utils/createQuestion';
import { p200 } from './p200';

export const p100 = createQuestion({
  description: 'Welcome again to the town',
  input: null,
  previus: null,
  variables: {
    talkPriest: false,
    talkMother: false,
    talkToGirl: false,
    goToJulia: false,
  },
  interactions: [
    {
      description: 'Talk to priest',
      type: 'TALK',
      action: () => {
        p100.variables!.talkPriest = true;
        return p101;
      },
    },
    {
      description: 'Talk to mother',
      type: 'TALK',
      action: () => {
        p100.variables!.talkMother = true;
        return p102;
      },
    },
    {
      description: 'Talk to boy',
      type: 'TALK',
      action: () => {
        return p103;
      },
    },
    {
      description: "Go to Julia's house",
      type: 'GOTO',
      dependencies: ['talkPriest'],
      action: () => {
        p100.variables!.goToJulia = true;
        return p104;
      },
    },
    {
      description: "Go to woodcutter's house",
      type: 'GOTO',
      dependencies: ['talkMother'],
      action: () => {
        return p105;
      },
    },
    {
      description: 'Go to Farm',
      type: 'GOTO',
      dependencies: ['talkMother', 'talkPriest', 'talkToGirl'],
      action: () => {
        return p200;
      },
    },
  ],
});

// Talk to priest
const p101 = createQuestion({
  description: [
    "Priest: My prayers go out to poor Julia. It's been a year since her husband has passed. She hasn't been seen all day",
    "Priest: I image she is grieving. Do you mind visiting her at her home? It's the house to the right as you leave town.",
  ],
  input: null,
  previus: p100,
  interactions: [],
});

// Talk to mother
const p102 = createQuestion({
  description: [
    'Mother: Did you hear about the boy? Julia lost her son in the cave shortly after her husband died. Poor Julia.',
    'Mother: I would never let my boys out of my sight.',
  ],
  input: null,
  previus: p100,
  interactions: [],
});

// Talk to boy
const p103 = createQuestion({
  description: [
    "Boy: Need to stay close to Momma otherwise she'll worry that we've run off.",
  ],
  input: null,
  previus: p100,
  interactions: [],
});

// Go to Julia's house
const p104 = createQuestion({
  description: [
    'There is a picture on the shelf of a wife, husband and a young boy. I wonder where they are.',
  ],
  input: null,
  previus: p100,
  interactions: [],
});

// Go to woodcutter's house
const p105 = createQuestion({
  description: ['You see a girl playing with a doll.'],
  input: null,
  previus: p100,
  interactions: [
    {
      description: 'Talk to girl',
      type: 'TALK',
      action: () => {
        p100.variables!.talkToGirl = true;
        return p106;
      },
    },
  ],
});

// Talk to girl
const p106 = createQuestion({
  description: [
    'Girl: My uncle and dad are out chopping wood to keep us warm in the winter. They should be home soon',
    "Girl: I heard there's a cave in the woods and that there is gold but I'm too scared to enter. They say there's a little boy that haunts over your shoulder.",
  ],
  input: null,
  previus: p105,
  interactions: [],
});
