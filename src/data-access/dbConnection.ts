import { Sequelize } from 'sequelize';

let dbConnection: Sequelize;

const getDbConnection = () => {
  if (!dbConnection) {
    dbConnection = new Sequelize(process.env.DB_CONNECTION);
  }

  return dbConnection;
};

export default getDbConnection;
