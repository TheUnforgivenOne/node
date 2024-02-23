import { DataTypes } from 'sequelize';
import getDbConnection from '../dbConnection';

let userGroupModel;

const getUserGroupModel = () => {
  if (!userGroupModel) {
    userGroupModel = getDbConnection().define(
      'user_group',
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.STRING,
        },
        userId: {
          allowNull: false,
          type: DataTypes.STRING,
          field: 'user_id',
        },
        groupId: {
          allowNull: false,
          type: DataTypes.STRING,
          field: 'group_id',
        },
      },
      {
        timestamps: false,
        freezeTableName: true,
      }
    );
  }

  return userGroupModel;
};

export default getUserGroupModel;
