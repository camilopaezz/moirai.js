import { PrevValues, Question } from '@/types';

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

const getQuestionList: (prevValues: PrevValues) => Question[] = (
  prevValues,
) => [
  // FIRST PART - TOWN
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
      'Girl: My uncle and dad are out chopping wood to keep us warn in the winter. They should be home soon.',
      "I heard there is gold in the cave but I'm too scared to enter. They say there's a little boy that haunts over your shoulder.",
    ],
    interactions: [
      {
        description: 'Back',
        ref: '1500',
        type: 'BACK',
      },
    ],
  },
  // SECOND PART - FARM
  {
    key: '2000',
    content: ['You are at the farm. The mother is working in the field.'],
    variables: {
      talk_to_woodcutter: false,
      poke_sheep: false,
    },
    interactions: [
      {
        description: 'Poke sheep',
        ref: '2100',
        type: 'POKE',
        dispatch: ['poke_sheep'],
      },
      {
        description: 'Talk to woodcutter',
        ref: '2200',
        type: 'TALK',
        dispatch: ['talk_to_woodcutter'],
      },
      {
        description: 'Go to the cave',
        ref: '3000',
        requires: ['talk_to_woodcutter', 'poke_sheep'],
        type: 'GOTO',
      },
      {
        description: 'Back',
        ref: '0000',
        type: 'BACK',
      },
    ],
  },
  {
    key: '2100',
    content: ['Sheep: Baaah'],
    interactions: [
      {
        description: 'Back',
        ref: '2000',
        type: 'BACK',
      },
    ],
  },
  {
    key: '2200',
    content: [
      'Woodcutter: My brother and I were chopping wood when we heard moans coming from the cave. My brother went in to investigate.',
      "He should have been back by now. I'm worried. Can you check on him?.",
    ],
    interactions: [
      {
        description: 'Back',
        ref: '2000',
        type: 'BACK',
      },
    ],
  },
  // THIRD PART - CAVE
  {
    key: '3000',
    content: ["Woodcutter: Hey you! Come over 'ere."],
    variables: {
      talk_to_woodcutter: false,
    },
    interactions: [
      {
        description: 'Talk to woodcutter',
        ref: '3100',
        type: 'TALK',
        dispatch: ['talk_to_woodcutter'],
      },
      {
        description: 'Go deeper into the cave',
        ref: '4000',
        type: 'GOTO',
        requires: ['talk_to_woodcutter'],
      },
    ],
  },
  {
    key: '3100',
    content: [
      "Woodcutter: Did my brother send you? Bless 'im. The moans are coming from further down. I'd go in but my sight's no good.",
      'You should take this knife. Who knows, you may need it.',
    ],
    interactions: [
      {
        description: 'Back',
        ref: '3000',
        type: 'BACK',
      },
    ],
  },
  // FOURTH PART - DEEPER INTO THE CAVE
  {
    key: '4000',
    content: [
      'You see a farmer with a knife and covered in blood. He approaches you.',
    ],
    variables: {
      talk_blood: false,
      talk_knife: false,
      talk_moans: false,
    },
    interactions: [
      {
        description: 'Why do you have blood on your overalls?',
        ref: '4100',
        type: 'TALK',
        dispatch: ['talk_blood'],
      },
      {
        description: 'Why do you have a knife?',
        ref: '4200',
        type: 'TALK',
        dispatch: ['talk_knife'],
      },
      {
        description: 'I heard moans, what have you done?',
        ref: '4300',
        type: 'TALK',
        dispatch: ['talk_moans'],
      },
      {
        description: 'Make a choice',
        ref: '5000',
        type: 'CHOICE',
        requires: ['talk_blood', 'talk_knife', 'talk_moans'],
      },
    ],
  },
  {
    content: [`Farmer: ${prevValues.whyBlood}`],
    key: '4100',
    interactions: [
      {
        description: 'Back',
        ref: '4000',
        type: 'BACK',
      },
    ],
  },
  {
    content: [`Farmer: ${prevValues.whyKnife}`],
    key: '4200',
    interactions: [
      {
        description: 'Back',
        ref: '4000',
        type: 'BACK',
      },
    ],
  },
  {
    content: [`Farmer: ${prevValues.whatYouDone}`],
    key: '4300',
    interactions: [
      {
        description: 'Back',
        ref: '4000',
        type: 'BACK',
      },
    ],
  },
  // FIFTH PART - CHOICE
  {
    key: '5000',
    content: ['You have a choice to make. What do you do?'],
    interactions: [
      {
        description: 'Kill the farmer',
        ref: '6000_kill',
        type: 'KILL',
      },
      {
        description: 'Let the farmer go',
        ref: '6000_let_go',
        type: 'LET_GO',
      },
    ],
  },
  {
    key: '6000_kill',
    content: [`You kill the farmer. There's a name: ${prevValues.name}`],
    interactions: [
      {
        description: 'Continue.',
        ref: '6000',
        type: 'GOTO',
      },
    ],
  },
  {
    key: '6000_let_go',
    content: [`You let the farmer go. You see a name: ${prevValues.name}`],
    interactions: [
      {
        description: 'Continue.',
        ref: '6000',
        type: 'GOTO',
      },
    ],
  },
  // SIXTH PART
  {
    key: '6000',
    content: [
      "You see a women's, she tells you:",
      '"I came here to end my life. My name is Julia and I want to see my child and husband in heaven..."',
      '"...My husband was a miner in these caves. He spent days mining for gold and then one day he found something..."',
      "He found a golden nugget. I thought we could retire and be comfortable for the rest of our lives, but he didn't trust me.",
      'He buried the golden nugget to spite me. Then he disappeared. Everyone in the town heard about our good fortune.',
      "They thought I was rich. I was so ashamed that I couldn't tell them the truth.",
      'One day my son wandered into the cave. He wanted to find his daddy. He wanted to make everything better.',
      "But he never came out of the cave. I went to look for him but i couldn't find him. Now it's too late. Now I have nobody.",
      "Will you help me? Will you help me end my life? You've done it before. It should be easier the second time.",
    ],
    interactions: [
      {
        description: 'Go back to the town',
        ref: '6100',
        type: 'GOTO',
      },
    ],
  },
  {
    key: '6100',
    content: ['A farmer approaches.'],
    interactions: [
      {
        description: 'Approach the farmer',
        ref: '6200',
        type: 'TALK',
      },
    ],
  },
  {
    key: '6200',
    content: ['Farmer: Why do you have blood on your overalls?'],
    input: {
      name: 'whyBlood',
    },
    interactions: [
      {
        description: 'Continue',
        ref: '6300',
        type: 'TALK',
      },
    ],
  },
  {
    key: '6300',
    content: ['Farmer: Why do you have a knife?'],
    input: {
      name: 'whyKnife',
    },
    interactions: [
      {
        description: 'Continue',
        ref: '6400',
        type: 'TALK',
      },
    ],
  },
  {
    key: '6400',
    content: ['Farmer: I heard moans, what have you done?'],
    input: {
      name: 'whatYouDone',
    },
    interactions: [
      {
        description: 'Continue',
        ref: '6500',
        type: 'TALK',
      },
    ],
  },
  {
    key: '6500',
    content: ['Farmer: What is your name?'],
    input: {
      name: 'name',
    },
    interactions: [
      {
        description: 'Continue',
        ref: '6600',
        type: 'TALK',
      },
    ],
  },
  {
    content: ['This is the end of the game. For now...'],
    key: '6600',
    interactions: [
      {
        description: 'End',
        ref: 'END',
        type: 'END',
      },
    ],
  },
  {
    key: 'END',
    content: ['The end'],
    interactions: [],
  },
];
