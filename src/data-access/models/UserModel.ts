import { DataTypes } from 'sequelize';
import getDbConnection from '../dbConnection';

let userModel;

const getUserModel = () => {
  if (!userModel) {
    userModel = getDbConnection().define(
      'user',
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
          field: 'is_deleted',
        },
      },
      {
        timestamps: false,
        freezeTableName: true,
      }
    );
  }

  return userModel;
};

export default getUserModel;
