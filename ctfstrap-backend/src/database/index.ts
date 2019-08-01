import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';

declare var process: {
  env: {
    NODE_ENV: 'production' | 'development';
    DB_NAME: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_TYPE: Dialect;
  };
};

export const connect = () => {
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_TYPE,
      models: [`${__dirname}/models`],
    },
  );

  if (process.env.NODE_ENV === 'development') {
    sequelize.sync({ logging: console.log });
  } else {
    sequelize.sync();
  }
};
