import client from './client';

export interface ChallItem {
  id: number;
  name: string;
  description: string;
  points: number;
  category: string;
  author: string;
}

export const listChall = () => client.get<ChallItem[]>('/chall/');
