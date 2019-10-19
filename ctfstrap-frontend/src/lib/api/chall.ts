import client from './client';
import { FileData } from './file';

export type Challenge = {
  id: number;
  name: string;
  description: string;
  points: number;
  category: string;
  author?: string;
  files?: FileData[];
  tags?: { name: string }[];
  hints?: { content: string; cost: number}[];
  flags?: { content: string }[];
};

export type ChallengeModal = Omit<Challenge, 'hints' | 'flags'> & { solved: boolean };

export const getChallList = () => client.get<ChallengeModal[]>('/chall');

export const createChall = (challenge: Omit<Challenge, 'id'>) =>
  client.post('/chall/create', challenge);

export const removeChall = (challengeId: number) =>
  client.post('/chall/remove', { challengeId });

export const authChall = (challengeId: number, flag: string) =>
  client.post('/chall/auth', { challengeId, flag });
