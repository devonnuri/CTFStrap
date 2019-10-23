import jwt from 'jsonwebtoken';
import { promisify } from 'util';

export interface TokenPayload {
  user: {
    id: number;
    email: string;
    admin: boolean;
  };
}

export const encodeToken = async (
  payload: object,
  subject: string,
): Promise<string> =>
  new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRET_TOKEN_KEY,
      {
        subject,
        expiresIn: '7d',
      },
      (error, token) => {
        if (error) reject(error);
        resolve(token);
      },
    );
  });

export const generateToken = async (
  id: number,
  email: string,
  admin: boolean,
) => encodeToken({ user: { id, email, admin } }, 'user');

export const decodeToken = async (token: string) =>
  promisify(jwt.verify)(token, process.env.SECRET_TOKEN_KEY) as Promise<
    TokenPayload
  >;
