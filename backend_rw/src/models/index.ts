import sequelize from '../database';
import User from './user';

const db = {
  sequelize,
  User,
};

export { db };