/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CaseFile {
  id: string;
  name: string;
  alias: string;
  caseNumber: string;
  mugshot: string;
  crime: string;
  dangerLevel: 1 | 2 | 3 | 4 | 5;
  dangerLabel: string;
  status: 'WANTED' | 'SUSPICIOUS' | 'CASE CLOSED' | 'OMEGA THREAT' | 'AIRBORNE';
  stampColor: string;
  lastSeen: string;
  alibi: string;
  specialSkills: string;
  redactedIntel: string;
  connectedCharacterIds: string[];
  quote: string;
}

export const CASE_FILES: CaseFile[] = [
  {
    id: 'satowshi',
    name: 'Satowshi "The Bull" Nakamoto-ish',
    alias: 'The Simp King of Wall Street / Pizza Philanthropist',
    caseNumber: 'CASE #0021-SIMP',
    mugshot: '/assets/aistudio/satowshi_f8205e9e.png',
    crime: 'Crashing first dates, trading 10,000 Bitcoins for 20 pizzas, and shouting "Hand job!" in upscale restaurants.',
    dangerLevel: 3,
    dangerLabel: 'Moderate (Self-Inflicted Financial Catastrophe)',
    status: 'WANTED',
    stampColor: '#EF4444',
    lastSeen: 'Sweating profusely behind booth #3 at Rosetta Bar.',
    alibi: 'Claims he was winning the stare-down fight against Harvey’s car until Jones broke his focus.',
    specialSkills: 'Diamond hands, thumb-pointing swagger, golden horn ring maintenance.',
    redactedIntel: 'Bought a taped banana for 2 BTC at an art gallery and forgot it was in his coat pocket for three weeks.',
    connectedCharacterIds: ['jones', 'harvey', 'abolian', 'emily'],
    quote: '"My hand IS my job! Why does everyone misunderstand basic financial chart navigation?!"',
  },
  {
    id: 'jones',
    name: 'Jones "The Chameleon"',
    alias: 'Dr. Love / Earpiece Infiltrator / The Lounge Lizard',
    caseNumber: 'CASE #0042-REPT',
    mugshot: '/assets/aistudio/jones_34ed27d4.png',
    crime: 'Practicing unlicensed dating psychology, chain-smoking on public bar counters, and ordering tactical mariachi bands.',
    dangerLevel: 2,
    dangerLabel: 'Low (Severe Psychological Damage to Clients)',
    status: 'SUSPICIOUS',
    stampColor: '#F59E0B',
    lastSeen: 'Perched on a cocktail stool coaching Satowshi through a walkie-talkie.',
    alibi: 'Was watching in HD 1080p and swears he said "talk about your boots, not her anatomy".',
    specialSkills: '360-degree vision, extreme sarcasm, Instagram stalking with back toes.',
    redactedIntel: 'Hides private keys inside a hollowed-out vintage cricket terrarium behind the bar.',
    connectedCharacterIds: ['satowshi', 'emily', 'high'],
    quote: '"Dude, you were staring at each other like two lovers. Just be happy I stopped you."',
  },
  {
    id: 'harvey',
    name: 'Harvey "Gold-Chain" Bull',
    alias: 'The Gucci Cowboy / Smirking Menace',
    caseNumber: 'CASE #0007-SMUG',
    mugshot: '/assets/aistudio/harvey_4bfe5089.png',
    crime: 'Malicious arson of rival portraits, hit-and-run neck slaps, and scamming pizza parlors with early cryptocurrency.',
    dangerLevel: 4,
    dangerLabel: 'High (Lethal Ego & Smug Radiation)',
    status: 'WANTED',
    stampColor: '#DC2626',
    lastSeen: 'Tearing rubber in a 1970 muscle car outside Mario’s Produce.',
    alibi: 'Claims the photograph of Satowshi caught fire from sheer second-hand embarrassment.',
    specialSkills: '100-yard smirking, lighter tricks, gold chain layering.',
    redactedIntel: 'Secretly checks Bitcoin charts at 3 AM and weeps quietly into his cowboy bandana.',
    connectedCharacterIds: ['satowshi'],
    quote: '"Baby, relax. You don’t have to pay. With Bitcoin, this idiot will accept anything!"',
  },
  {
    id: 'grandma',
    name: 'Grandma "Lethal Knees" Cow',
    alias: 'The Cupcake Sensei / Matriarch of Doom',
    caseNumber: 'CASE #9999-OMGA',
    mugshot: '/assets/aistudio/grandma_acce9c8f.png',
    crime: 'Vigilante limb elongation, kung-fu roundhouse kicks against home invaders, and illegal slipper warfare.',
    dangerLevel: 5,
    dangerLabel: 'Maximum (DO NOT ATTEMPT ARREST)',
    status: 'OMEGA THREAT',
    stampColor: '#7C3AED',
    lastSeen: 'Sitting peacefully in an armchair offering sweet herbal tea to her victims.',
    alibi: 'Stated she was merely dusting the CRT console when a cow flew face-first into her slipper.',
    specialSkills: 'Dhalsim-style yoga punches, supersonic slipper throws, baking weaponized cupcakes.',
    redactedIntel: 'The CRT rabbit ears are hooked directly to an off-grid Bitcoin mining node in her attic.',
    connectedCharacterIds: ['high', 'grandpa'],
    quote: '"Nobody... touches... my... T... V!"',
  },
  {
    id: 'high',
    name: 'High "Roland2" Beanie',
    alias: 'The Beanie Bandit / Superman Impersonator',
    caseNumber: 'CASE #0420-BARE',
    mugshot: '/assets/aistudio/high_3dc2d223.png',
    crime: 'Breaking & entering Grandma’s apartment, indecent exposure of butt tattoo, and unpermitted rooftop window launches.',
    dangerLevel: 3,
    dangerLabel: 'Unpredictable (Zero Survival Instincts)',
    status: 'AIRBORNE',
    stampColor: '#2563EB',
    lastSeen: 'Gliding majestically into the night sky wearing a stolen Kryptonian bodysuit.',
    alibi: 'Claims a Truth-or-Dare challenge is a legally binding international contract under bar law.',
    specialSkills: 'Stealth carpet crawling, butt tattoo flex, surviving four-story sheet catches.',
    redactedIntel: 'The "Roland2" tattoo was paid for in 2011 with 50 Dogecoins that are now worth more than his car.',
    connectedCharacterIds: ['grandma', 'satowshi', 'emily', 'jones'],
    quote: '"I’m not here for your TV, ma’am! I’m here for the Superman suit!"',
  },
  {
    id: 'emily',
    name: 'Emily "Tap Master" Cow',
    alias: 'The Rosetta Queen / Five-Stein Slinger',
    caseNumber: 'CASE #0088-BREW',
    mugshot: '/assets/aistudio/emily_d0a816d4.png',
    crime: 'Operating high-stakes whiskey bottle spinning rings and facilitating reckless neighborhood dares.',
    dangerLevel: 2,
    dangerLabel: 'Low (Will Revoke Tab Privileges on Sight)',
    status: 'CASE CLOSED',
    stampColor: '#059669',
    lastSeen: 'Cleaning beer glasses at Rosetta Bar with an unimpressed glare.',
    alibi: 'She only spun the bottle; what the idiots chose to do with the dare was outside city jurisdiction.',
    specialSkills: 'Carrying 5 foaming beer steins in each arm, cutting off bulls in 0.5 seconds.',
    redactedIntel: 'Grandma gave her the recipe for the cupcakes, but she substituted vanilla for Irish whiskey.',
    connectedCharacterIds: ['satowshi', 'jones', 'high'],
    quote: '"This is officially the funniest game I’ve ever played."',
  },
  {
    id: 'abolian',
    name: 'Abolian "The Prosecutor" Esq.',
    alias: 'Five-Second Inquisitor / Afro Attorney',
    caseNumber: 'CASE #0104-LEGL',
    mugshot: '/assets/aistudio/abolian_e77e6eb3.png',
    crime: 'Humiliation of crypto founders in broad daylight and rapid-fire corporate interrogation.',
    dangerLevel: 3,
    dangerLabel: 'Moderate (Verbal Decapitation Guaranteed)',
    status: 'CASE CLOSED',
    stampColor: '#0D9488',
    lastSeen: 'Storming out of Rosetta Cafe with legal dossiers pressed firmly against her chest.',
    alibi: 'Left immediately when her date announced that handjobs were his primary occupation.',
    specialSkills: '5-second job timer, briefcase deflection, spotting financial fraud instantly.',
    redactedIntel: 'Actually mined 100 Bitcoin on her laptop in law school and refuses to tell anyone.',
    connectedCharacterIds: ['satowshi'],
    quote: '"You’ve got 5 seconds to tell me your job in just one word. Go!"',
  },
  {
    id: 'bodybuilder',
    name: 'Bruno "Biceps" Bull',
    alias: 'The Protein Whale / Unbuttoned Denim',
    caseNumber: 'CASE #0777-BUFF',
    mugshot: '/assets/aistudio/body-bulder_8101fa6a.png',
    crime: 'Public intimidation of thin crypto traders and excessive flexing in front of ATM screens.',
    dangerLevel: 4,
    dangerLabel: 'High (Can Bench-Press a Tesla)',
    status: 'SUSPICIOUS',
    stampColor: '#D97706',
    lastSeen: 'Doing unbuttoned jean squats in the VIP lounge.',
    alibi: 'Was mid-set doing preacher curls; claims muscle gains are the only true store of value.',
    specialSkills: 'Pec bouncing, chain rattling, protein synthesis at 200% efficiency.',
    redactedIntel: 'Secretly drinks herbal chamomile tea with Grandma on Sunday mornings.',
    connectedCharacterIds: ['satowshi'],
    quote: '"Bro, your portfolio might crash 80%, but these triceps are decentralized."',
  },
  {
    id: 'grandpa',
    name: 'Grandpa "The General" Ghost',
    alias: 'Major Leather / Ghost of Frugality',
    caseNumber: 'CASE #1945-SPOOK',
    mugshot: '/assets/aistudio/grandpa_f9cc3c33.png',
    crime: 'Spectral harassment of younger generation bulls and threatening descendants with a floating leather belt.',
    dangerLevel: 4,
    dangerLabel: 'High (Ethereal Disciplinary Action)',
    status: 'OMEGA THREAT',
    stampColor: '#4B5563',
    lastSeen: 'Hovering aggressively above Grandma’s mantlepiece looking disgusted.',
    alibi: 'Can pass through solid walls and cannot be prosecuted under earthly maritime law.',
    specialSkills: 'Belt whipping through dimensions, spectral scowling, inflation lectures.',
    redactedIntel: 'Buried a mason jar of silver quarters under the patio that is currently worth $4.50.',
    connectedCharacterIds: ['grandma'],
    quote: '"Back in my day, a nickel bought you a tractor and some dignity! What is a bit-coin?!"',
  },
];

/**
 * Filter case files by search query or status
 */
export function filterCaseFiles(
  files: CaseFile[],
  query: string,
  statusFilter?: string
): CaseFile[] {
  return files.filter((file) => {
    const matchesQuery =
      !query ||
      file.name.toLowerCase().includes(query.toLowerCase()) ||
      file.alias.toLowerCase().includes(query.toLowerCase()) ||
      file.crime.toLowerCase().includes(query.toLowerCase()) ||
      file.caseNumber.toLowerCase().includes(query.toLowerCase());

    const matchesStatus =
      !statusFilter || statusFilter === 'ALL' || file.status === statusFilter;

    return matchesQuery && matchesStatus;
  });
}

/**
 * Returns list of characters connected to a target character for the detective corkboard
 */
export function getConnectedSuspects(characterId: string, files: CaseFile[]): CaseFile[] {
  const target = files.find((f) => f.id === characterId);
  if (!target) return [];
  return files.filter((f) => target.connectedCharacterIds.includes(f.id));
}
