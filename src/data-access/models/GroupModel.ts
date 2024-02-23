import { DataTypes } from 'sequelize';
import getDbConnection from '../dbConnection';

let groupModel;

const getGroupModel = () => {
  if (!groupModel) {
    groupModel = getDbConnection().define(
      'group',
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.STRING,
        },
        name: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        permissions: {
          type: DataTypes.ARRAY(DataTypes.STRING),
        },
      },
      {
        timestamps: false,
        freezeTableName: true,
      }
    );
  }

  return groupModel;
};

export default getGroupModel;
