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
  hints?: { content: string; cost: number }[];
  flags?: { content: string }[];
};

export type ChallengeModal = Omit<Challenge, 'hints' | 'flags'> & {
  solved: boolean;
};

export const viewAllChall = () => client.get<Challenge[]>('/chall');

export const viewChall = (id: number) => client.get<Challenge>(`/chall/${id}`);

export const createChall = (
  challenge: Omit<Challenge, 'id' | 'files'> & { files: { id: number }[] },
) => client.post('/chall/create', challenge);

export const removeChall = (challengeId: number) =>
  client.post('/chall/remove', { challengeId });

export const updateChall = (
  challenge: Omit<Challenge, 'files'> & { files: { id: number }[] },
) => client.post('/chall/update', challenge);

export const authChall = (challengeId: number, flag: string) =>
  client.post('/chall/auth', { challengeId, flag });
