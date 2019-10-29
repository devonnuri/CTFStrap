import client from './client';

export type RankUser = {
  username: string;
  points: number;
  lastSolve: Date;
};

export type User = {
  id: number;
  username: string;
  email: string;
  points: number;
  admin: boolean;
  lastSolve: Date;
  submissions: object[];
};

export const getUserList = () => client.get<User[]>('/user/');

export const getSolves = () => client.get<number[]>('/user/solves');

export const getRank = () => client.get<RankUser[]>('/user/rank');

export const removeUser = (userId: number) =>
  client.post('/user/remove', { userId });
