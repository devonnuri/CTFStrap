import client from './client';
import { AxiosResponse } from 'axios';

export type RankUser = {
  username: string;
  points: number;
  lastSolve: Date;
};

export const getSolves = () => client.get('/user/solves');

export const getRank = (): Promise<AxiosResponse<RankUser[]>> =>
  client.get('/user/rank');
