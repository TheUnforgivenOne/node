import { DataTypes } from 'sequelize';
import getDbConnection from '../dbConnection';

const getUserModel = () => {
  return getDbConnection().define(
    'User',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      login: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      age: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      isDeleted: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      timestamps: false,
    }
  );
};

export default getUserModel;
