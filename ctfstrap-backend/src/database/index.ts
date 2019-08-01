import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';
import User from './models/User';

declare var process: {
  env: {
    NODE_ENV: 'production' | 'development';
    CTFSTRAP_DB_NAME: string;
    CTFSTRAP_DB_USERNAME: string;
    CTFSTRAP_DB_PASSWORD: string;
    CTFSTRAP_DB_HOST: string;
    CTFSTRAP_DB_TYPE: Dialect;
  };
};

export const connect = () => {
  const sequelize = new Sequelize(
    process.env.CTFSTRAP_DB_NAME,
    process.env.CTFSTRAP_DB_USERNAME,
    process.env.CTFSTRAP_DB_PASSWORD,
    {
      host: process.env.CTFSTRAP_DB_HOST,
      dialect: process.env.CTFSTRAP_DB_TYPE,
      models: [`${__dirname}/models`],
    },
  );

  if (process.env.NODE_ENV === 'development') {
    sequelize.sync({ logging: console.log });
  } else {
    sequelize.sync();
  }
};
