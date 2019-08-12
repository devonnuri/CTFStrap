import client from './client';

export const getSolves = () => client.get('/user/solves');
