import client from './client';

export const getSolves = () => client.get('/user/solves');

export const getRank = () => client.get('/user/rank');
