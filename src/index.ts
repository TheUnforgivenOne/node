import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';
import UserRouter from './UserRouter';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(process.env.DB_CONNECTION);
const app = express();
const PORT = process.env.PORT ?? 4000;

export const UserModel = sequelize.define('user', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

(async () => {
  try {
    await sequelize.authenticate();

    app.use(express.json());

    app.use('/user', UserRouter);

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (e) {
    throw e;
  }
})();
