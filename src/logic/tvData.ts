/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Episode {
  id: string;
  channelNumber: number;
  channelCode: string;
  title: string;
  tagline: string;
  duration: string;
  videoUrl: string;
  youtubeUrl: string;
  thumbnail: string;
  teaser: string; // Non-spoiler teaser
  keyQuote: string;
  chapters: { title: string; timestamp: string }[];
}

export interface TvCompanion {
  id: string;
  name: string;
  title: string;
  avatar: string;
  reaction: string;
  bgColor: string;
}

export const EPISODES: Episode[] = [
  {
    id: 'ep-1',
    channelNumber: 1,
    channelCode: 'CH 01',
    title: 'Episode 1: The $10,000 Bitcoin Pizza',
    tagline: 'He was nobody chasing a dream, then Bitcoin changed everything.',
    duration: '01:12',
    videoUrl: '/assets/aistudio/Episode_01_Last__compressed_by_happyscribe.com___1__f33f5c16.mp4',
    youtubeUrl: 'https://youtube.com/@satowshi_official',
    thumbnail: '/assets/aistudio/satowshi_f8205e9e.png',
    teaser:
      'A tense street-corner stare-down brings back memories of 2010. What happens when twenty extra-large pizzas meet an unknown digital currency? Tune in to find out why the tavern broke into celebration!',
    keyQuote: '"Shut up dude, I was winning the stare-down fight!"',
    chapters: [
      { title: 'The Stare-Down Confrontation', timestamp: '00:00' },
      { title: 'No Steak Pizza Parlor', timestamp: '00:25' },
      { title: 'Watchyo Nutts Breaking News', timestamp: '00:45' },
    ],
  },
  {
    id: 'ep-2',
    channelNumber: 2,
    channelCode: 'CH 02',
    title: 'Episode 2: The 5-Second Challenge',
    tagline: '5 seconds, 1 word, and an unforgettable romantic encounter.',
    duration: '02:49',
    videoUrl: '/assets/aistudio/Episode_02_Last__compressed_by_happyscribe.com__7df48258.mp4',
    youtubeUrl: 'https://youtube.com/@satowshi_official',
    thumbnail: '/assets/aistudio/abolian_e77e6eb3.png',
    teaser:
      'Satowshi takes a shot at romance with corporate attorney Abolian. When challenged to summarize his career in a single word under a ticking clock, things quickly go off the rails.',
    keyQuote: '"My hand IS my job! Why does everyone misunderstand?!"',
    chapters: [
      { title: 'Rosetta Bar Confessions', timestamp: '00:00' },
      { title: 'The Countdown Question', timestamp: '01:12' },
      { title: 'The Potted Plant Strategy', timestamp: '02:00' },
    ],
  },
  {
    id: 'ep-3',
    channelNumber: 3,
    channelCode: 'CH 03',
    title: 'Episode 3: Spin The Bottle Dare',
    tagline: 'Nobody touches the TV... unless you have the right password.',
    duration: '01:54',
    videoUrl: '/assets/aistudio/Episode_3_04.7__compressed_by_happyscribe.com__925a17f7.mp4',
    youtubeUrl: 'https://youtube.com/@satowshi_official',
    thumbnail: '/assets/aistudio/high_3dc2d223.png',
    teaser:
      'A rowdy game of tavern bottle-spinning spins out of control when someone draws a dare to infiltrate a private residence across town. Watch how the team handles an unexpected confrontation!',
    keyQuote: '"NOBODY... TOUCHES... MY... T... V!"',
    chapters: [
      { title: 'Truth or Dare at the Booth', timestamp: '00:00' },
      { title: 'The Night Mission', timestamp: '00:45' },
      { title: 'The Flying Red Cape', timestamp: '01:20' },
    ],
  },
];

// Rotating TV companions so visitors can enjoy commentary from diverse characters, not just Grandma!
export const TV_COMPANIONS: TvCompanion[] = [
  {
    id: 'grandma',
    name: 'Grandma Cow',
    title: 'Living Room Matriarch',
    avatar: '/assets/aistudio/grandma_acce9c8f.png',
    reaction: 'Sweetheart, sit down and have some tea! Just don’t get grease on my vintage screen!',
    bgColor: '#FAF5FF',
  },
  {
    id: 'jones',
    name: 'Jones The Chameleon',
    title: 'Earpiece Strategist',
    avatar: '/assets/aistudio/jones_34ed27d4.png',
    reaction: 'Dude, I told Satowshi to talk about his boots. Why does nobody ever listen to the lizard?!',
    bgColor: '#ECFDF5',
  },
  {
    id: 'harvey',
    name: 'Harvey Cowboy',
    title: 'Gold-Chain Rival',
    avatar: '/assets/aistudio/harvey_4bfe5089.png',
    reaction: 'Ha! That bull got lucky in 2010. My 1970 muscle car still has better horsepower!',
    bgColor: '#FEF2F2',
  },
  {
    id: 'abolian',
    name: 'Abolian Esq.',
    title: 'Legal Counsel',
    avatar: '/assets/aistudio/abolian_e77e6eb3.png',
    reaction: 'I am taking notes for the copyright deposition. Satowshi still owes me an explanation.',
    bgColor: '#F0FDFA',
  },
  {
    id: 'high',
    name: 'High',
    title: 'Superman Fan',
    avatar: '/assets/aistudio/high_3dc2d223.png',
    reaction: 'Best night of my life, man. Flying through the air in a cape feels totally spiritual.',
    bgColor: '#FFFBEB',
  },
];
