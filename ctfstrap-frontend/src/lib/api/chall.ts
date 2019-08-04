import client from './client';
import { ChallModal } from './../../modules/chall';

export const getChallList = () => client.get<ChallModal[]>('/chall/');

export const authChall = (challengeId: number, flag: string) =>
  client.post('/chall/auth', { challengeId, flag });
