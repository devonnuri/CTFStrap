import * as jwt from 'jsonwebtoken';


export const encodeToken = async (
  payload: object,
  subject: string,
): Promise<string> => new Promise((resolve, reject) => {
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

export const generateToken = async (id: number, email: string) => encodeToken({ user: { id, email } }, 'user');

export const decodeToken = async (token: string) => new Promise((resolve, reject) => {
  jwt.verify(token, process.env.SECRET_TOKEN_KEY, (error, decoded) => {
    if (error) reject(error);
    resolve(decoded);
  });
});
