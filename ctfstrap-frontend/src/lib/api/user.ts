import client from './client';

export const solves = () => client.get('/chall/solves');
