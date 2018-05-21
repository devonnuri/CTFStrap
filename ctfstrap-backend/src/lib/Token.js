import jwt from 'jsonwebtoken';

export const generateToken = async (payload, subject) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRET_TOKEN_KEY,
      {
        expiresIn: '7d',
        subject
      },
      (error, token) => {
        if (error) reject(error);
        resolve(token);
      }
    );
  });
};

export const decodeToken = async token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) reject(error);
      resolve(decoded);
    });
  });
};
