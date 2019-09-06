import client from './client';
import { ChallModal } from './../../modules/chall';

export type Challenge = {
  id: number;
  name: string;
  description: string;
  points: number;
  category: string;
  author: string;
  files: { location: string }[];
  tags: { name: string }[];
  solved: boolean;
};

export const getChallList = () => client.get<ChallModal[]>('/chall');

export const authChall = (challengeId: number, flag: string) =>
  client.post('/chall/auth', { challengeId, flag });
