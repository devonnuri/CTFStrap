import client from './client';

export const login = ({ name, password }: { name: string; password: string }) =>
  client.post('/auth/login', { name, password });

export const logout = () => client.get('/auth/logout');

export const register = ({
  email,
  username,
  password,
}: {
  email: string;
  username: string;
  password: string;
}) => client.post('/auth/register', { email, username, password });

export const check = () => client.get('/auth/check');
