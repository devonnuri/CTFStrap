import client from './client';

export type RankUser = {
  username: string;
  points: number;
  lastSolve: Date;
};

export const getSolves = () => client.get<number[]>('/user/solves');

export const getRank = () => client.get<RankUser[]>('/user/rank');
