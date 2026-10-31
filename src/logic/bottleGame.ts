/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BottleCharacter {
  id: string;
  name: string;
  role: string;
  angle: number; // degrees around circle (0 to 360)
  avatar: string;
  avatarVariantSvg?: string;
  tagline: string;
  color: string;
}

export interface ChallengeQuestion {
  id: string;
  characterId: string;
  type: 'truth' | 'dare';
  text: string;
  difficulty: 'mild' | 'spicy' | 'chaotic';
  characterComment: string;
}

// Exactly the characters who sat at the booth table in Episode 3 for Spin The Bottle:
// 1. Satowshi (The Crypto Bull)
// 2. Emily (The Rosetta Bartender who spun the whiskey bottle)
// 3. Jones (The Chameleon sitting on the table)
// Exactly the 4 main characters requested for Spin The Bottle:
// 1. Satowshi (The Crypto Bull)
// 2. Emily (The Rosetta Bartender who spun the whiskey bottle)
// 3. Jones (The Chameleon sitting on the table)
// 4. High (The Stonercow who took the dare to rob Grandma's Superman suit)
export const BOTTLE_CHARACTERS: BottleCharacter[] = [
  {
    id: 'satowshi',
    name: 'Satowshi',
    role: 'The Crypto Bull',
    angle: 0,
    avatar: '/assets/aistudio/satowshi_f8205e9e.png',
    tagline: 'Still hodling 10,000 pizzas in his soul',
    color: '#3B82F6',
  },
  {
    id: 'emily',
    name: 'Emily',
    role: 'Rosetta Bartender',
    angle: 90,
    avatar: '/assets/aistudio/emily_d0a816d4.png',
    tagline: 'Pours beer, breaks hearts, spins bottles',
    color: '#EC4899',
  },
  {
    id: 'jones',
    name: 'Jones',
    role: 'Chameleon Sidekick',
    angle: 180,
    avatar: '/assets/aistudio/jones_34ed27d4.png',
    tagline: 'Your worst earpiece dating advisor',
    color: '#10B981',
  },
  {
    id: 'high',
    name: 'High',
    role: 'The Stonercow',
    angle: 270,
    avatar: '/assets/aistudio/high_3dc2d223.png',
    tagline: 'Always daring to jump out of windows',
    color: '#F59E0B',
  },
];

export const TRUTH_QUESTIONS: ChallengeQuestion[] = [
  {
    id: 't1',
    characterId: 'satowshi',
    type: 'truth',
    text: 'If someone offered you 10,000 Bitcoins or unlimited pepperoni pizza for life, what are you picking honestly?',
    difficulty: 'mild',
    characterComment: 'Do not disappoint me. Pizza is temporary, Bitcoin is forever!',
  },
  {
    id: 't2',
    characterId: 'satowshi',
    type: 'truth',
    text: 'What is the most awkward thing you have ever blurted out during a first date?',
    difficulty: 'spicy',
    characterComment: 'Trust me, nothing beats yelling "Hand job" across Rosetta Bar.',
  },
  {
    id: 't3',
    characterId: 'satowshi',
    type: 'truth',
    text: 'Have you ever checked your crypto/stock portfolio while someone was talking to you about their feelings?',
    difficulty: 'spicy',
    characterComment: 'Green candles don’t wait for small talk, buddy.',
  },
  {
    id: 't4',
    characterId: 'emily',
    type: 'truth',
    text: 'Have you ever pretended to listen to someone just because they looked handsome or brought you food?',
    difficulty: 'mild',
    characterComment: 'I work at a bar, I see this every single evening.',
  },
  {
    id: 't5',
    characterId: 'emily',
    type: 'truth',
    text: 'What is the absolute worst pickup line someone has attempted on you?',
    difficulty: 'mild',
    characterComment: 'A guy once pulled a cactus out of his pocket and called it an art piece.',
  },
  {
    id: 't6',
    characterId: 'emily',
    type: 'truth',
    text: 'Would you ever lend money to a friend who claims their meme coin is "guaranteed to 100x"?',
    difficulty: 'spicy',
    characterComment: 'If you say yes, please leave my bar immediately.',
  },
  {
    id: 't7',
    characterId: 'jones',
    type: 'truth',
    text: 'Have you ever secretly listened to someone’s conversation through headphones or earpieces without telling them?',
    difficulty: 'spicy',
    characterComment: 'That’s literally my primary job description with Satowshi.',
  },
  {
    id: 't8',
    characterId: 'jones',
    type: 'truth',
    text: 'What is a terrible piece of advice you gave someone with total confidence?',
    difficulty: 'chaotic',
    characterComment: 'I told him to talk about his boots, how was I supposed to know she heard boobs?',
  },
  {
    id: 't9',
    characterId: 'jones',
    type: 'truth',
    text: 'If you had to hide from Grandma after she catches you stealing her TV, where are you hiding?',
    difficulty: 'mild',
    characterComment: 'Nowhere on Earth is safe from her stretchy karate arm.',
  },
  {
    id: 't10',
    characterId: 'high',
    type: 'truth',
    text: 'Do you have an embarrassing tattoo or a souvenir you regret from a wild night out?',
    difficulty: 'mild',
    characterComment: 'Hey man, my Roland2 butt tattoo is a masterwork of fine art.',
  },
  {
    id: 't11',
    characterId: 'high',
    type: 'truth',
    text: 'What is the strangest outfit you have ever worn in public without a care in the world?',
    difficulty: 'mild',
    characterComment: 'Burglar mask and striped tank top hits different in broad daylight.',
  },
  {
    id: 't12',
    characterId: 'high',
    type: 'truth',
    text: 'What was your highest level of panic in the last 12 months?',
    difficulty: 'spicy',
    characterComment: 'Probably when Grandma did Dhalsim yoga kicks at my face.',
  },
  {
    id: 't13',
    characterId: 'satowshi',
    type: 'truth',
    text: 'When was the last time you literally cried over money, prices, or missing out on a deal?',
    difficulty: 'spicy',
    characterComment: 'Just a few weeks ago when Bitcoin hit 69k and I didn’t buy the dip!',
  },
  {
    id: 't14',
    characterId: 'emily',
    type: 'truth',
    text: 'What is the most expensive useless item currently sitting in your home right now?',
    difficulty: 'mild',
    characterComment: 'Satowshi brought a banana taped to canvas and forgot it at booth #3.',
  },
  {
    id: 't15',
    characterId: 'jones',
    type: 'truth',
    text: 'If everyone in this room had to fight Grandma, who do you think gets knocked out first?',
    difficulty: 'chaotic',
    characterComment: 'Satowshi for sure, man starts sweating just looking at stairs.',
  },
  {
    id: 't16',
    characterId: 'high',
    type: 'truth',
    text: 'Have you ever taken credit for an idea someone else muttered 10 seconds earlier?',
    difficulty: 'mild',
    characterComment: 'Hey man, that’s called decentralized consensus.',
  },
];

export const DARE_CHALLENGES: ChallengeQuestion[] = [
  {
    id: 'd1',
    characterId: 'satowshi',
    type: 'dare',
    text: 'Deliver a 10-second elevator pitch for a ridiculous crypto coin called "MooCoin" right now out loud.',
    difficulty: 'mild',
    characterComment: 'Show some investor confidence! Don’t blink!',
  },
  {
    id: 'd2',
    characterId: 'satowshi',
    type: 'dare',
    text: 'Strike Satowshi’s classic thumbs-up pose with an imaginary gold coin for 5 full seconds.',
    difficulty: 'mild',
    characterComment: 'Smirk with your teeth showing, just like the billboard!',
  },
  {
    id: 'd3',
    characterId: 'satowshi',
    type: 'dare',
    text: 'Text a friend: "I just traded my savings for 10,000 frozen pizzas" and wait for their response without explaining.',
    difficulty: 'spicy',
    characterComment: 'Real history happened this way in 2010!',
  },
  {
    id: 'd4',
    characterId: 'emily',
    type: 'dare',
    text: 'Balance an object (pen, book, or phone) on the palm of your hand like Emily carrying 5 giant beer mugs for 10 seconds.',
    difficulty: 'mild',
    characterComment: 'Don’t drop the beer, beer is sacred in this establishment!',
  },
  {
    id: 'd5',
    characterId: 'emily',
    type: 'dare',
    text: 'Speak in your most dramatic movie trailer voice for your next three sentences.',
    difficulty: 'mild',
    characterComment: 'IN A WORLD WHERE BITCOIN RULES SUPREME...',
  },
  {
    id: 'd6',
    characterId: 'emily',
    type: 'dare',
    text: 'Do your best impression of a fancy bartender shaking an invisible dry martini for 8 seconds.',
    difficulty: 'mild',
    characterComment: 'Put some wrist into it! Two olives on top!',
  },
  {
    id: 'd7',
    characterId: 'jones',
    type: 'dare',
    text: 'Do a chameleon eye roll: keep your face still while looking in two totally opposite directions.',
    difficulty: 'mild',
    characterComment: 'One eye on the charts, one eye on Grandma’s slippers.',
  },
  {
    id: 'd8',
    characterId: 'jones',
    type: 'dare',
    text: 'Whisper "Shut up dude, you were winning the stare-down fight" to whoever is closest to you.',
    difficulty: 'spicy',
    characterComment: 'Classic Episode 1 maneuver.',
  },
  {
    id: 'd9',
    characterId: 'jones',
    type: 'dare',
    text: 'Take a sip of your beverage with pinky fingers pointed up as if meeting royalty.',
    difficulty: 'mild',
    characterComment: 'Classy lizard vibes only.',
  },
  {
    id: 'd10',
    characterId: 'high',
    type: 'dare',
    text: 'Do the Superman flying pose in your chair with arms outstretched and cape noises for 7 seconds.',
    difficulty: 'mild',
    characterComment: 'Up, up, and out of Grandma’s window!',
  },
  {
    id: 'd11',
    characterId: 'high',
    type: 'dare',
    text: 'Stand up and do a quick 5-second victory celebration dance as if your wallet just 100x’d.',
    difficulty: 'spicy',
    characterComment: 'Channel your inner Episode 1 pole dance energy!',
  },
  {
    id: 'd12',
    characterId: 'high',
    type: 'dare',
    text: 'Hold a blank stare out the window with a dramatic cowboy squint for 10 seconds.',
    difficulty: 'mild',
    characterComment: 'Stare down Harvey’s muscle car, man.',
  },
  {
    id: 'd13',
    characterId: 'satowshi',
    type: 'dare',
    text: 'Dramatically reenact crying over missing the all-time high with fake sobs.',
    difficulty: 'spicy',
    characterComment: 'Gotta shed a tear for the missed gains!',
  },
  {
    id: 'd14',
    characterId: 'emily',
    type: 'dare',
    text: 'Compliment the person to your left (or yourself in the mirror) using only financial and crypto terms.',
    difficulty: 'mild',
    characterComment: '"Baby, your fundamentals are completely bullish."',
  },
  {
    id: 'd15',
    characterId: 'jones',
    type: 'dare',
    text: 'Give your best impression of Grandma warning someone: "NOBODY TOUCHES MY TV!"',
    difficulty: 'chaotic',
    characterComment: 'Channel that ancient kung-fu energy or face the slipper!',
  },
  {
    id: 'd16',
    characterId: 'high',
    type: 'dare',
    text: 'Spell your name backwards out loud in under 5 seconds or take 5 jumping jacks.',
    difficulty: 'mild',
    characterComment: 'Tick tock! No stalling at this booth table!',
  },
];

/**
 * Calculates spin physics:
 * Determines the target character index and returns total rotation angle in degrees.
 * The bottle starts at currentAngle, spins multiple full rotations (e.g. 4-7 turns),
 * and lands on the selected character's angle with a slight organic wobble offset (-6° to +6°).
 */
export function calculateBottleTarget(
  targetIndex: number,
  currentAngle: number,
  minTurns = 5
): { finalAngle: number; character: BottleCharacter } {
  const safeIndex = ((targetIndex % BOTTLE_CHARACTERS.length) + BOTTLE_CHARACTERS.length) % BOTTLE_CHARACTERS.length;
  const targetChar = BOTTLE_CHARACTERS[safeIndex];

  // Current normalized angle
  const currentMod = currentAngle % 360;
  const targetAngle = targetChar.angle;

  // Degrees needed from currentMod to targetAngle
  let diff = targetAngle - currentMod;
  if (diff < 0) diff += 360;

  // Organic wobble within +/- 8 degrees
  const wobble = (Math.random() - 0.5) * 12;

  const totalAddedDegrees = minTurns * 360 + diff + wobble;
  const finalAngle = currentAngle + totalAddedDegrees;

  return {
    finalAngle,
    character: targetChar,
  };
}

/**
 * Returns character corresponding to a given angle
 */
export function getCharacterByAngle(angleDegrees: number): BottleCharacter {
  const normalized = ((angleDegrees % 360) + 360) % 360;
  let closestChar = BOTTLE_CHARACTERS[0];
  let minDiff = 360;

  for (const char of BOTTLE_CHARACTERS) {
    let diff = Math.abs(normalized - char.angle);
    if (diff > 180) diff = 360 - diff;
    if (diff < minDiff) {
      minDiff = diff;
      closestChar = char;
    }
  }

  return closestChar;
}

/**
 * Picks a random question of the given type, avoiding repeating previous question
 */
export function getRandomQuestion(
  characterId: string,
  type: 'truth' | 'dare',
  previousId?: string
): ChallengeQuestion {
  const pool = type === 'truth' ? TRUTH_QUESTIONS : DARE_CHALLENGES;
  
  // Prefer questions matching character if available, otherwise any from pool
  const charMatches = pool.filter((q) => q.characterId === characterId && q.id !== previousId);
  const candidatePool = charMatches.length > 0 ? charMatches : pool.filter((q) => q.id !== previousId);

  const selected = candidatePool[Math.floor(Math.random() * candidatePool.length)] || pool[0];
  return selected;
}
