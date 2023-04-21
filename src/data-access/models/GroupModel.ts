import { DataTypes } from 'sequelize';
import getDbConnection from '../dbConnection';

const getGroupModel = () => {
  return getDbConnection().define('Group', {
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
  });
};

export default getGroupModel;
