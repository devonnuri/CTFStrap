import client from './client';

export type Challenge = {
  id: number;
  name: string;
  description: string;
  points: number;
  category: string;
  author: string;
  files: { location: string }[];
  tags: { name: string }[];
  hints: { content: string; cost: number}[];
  flags: { content: string }[];
};

export type ChallengeModal = Omit<Challenge, 'hints'|'flags'> & {solved: boolean};

export const getChallList = () => client.get<ChallengeModal[]>('/chall');

export const createChall = (challenge: Challenge) => client.post('/chall/create', challenge);

export const authChall = (challengeId: number, flag: string) =>
  client.post('/chall/auth', { challengeId, flag });
