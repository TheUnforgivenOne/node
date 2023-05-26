import express from 'express';
import dotenv from 'dotenv';
import UserController from './controllers/UserController';
import GroupController from './controllers/GroupController';
import getDbConnection from './data-access/dbConnection';
import init_relations from './data-access/models/init_relations';
import apiLogger from './middlewares/apiLogger';
import errorHandler from './middlewares/errorHandler';
import logger from './middlewares/logger';

(async () => {
  try {
    dotenv.config();
    const PORT = process.env.PORT ?? 4000;

    await getDbConnection().authenticate();
    init_relations();

    const app = express();

    const userController = new UserController();
    const groupController = new GroupController();

    app.use(express.json());
    app.use(apiLogger);
    app.use('/user', userController.router);
    app.use('/group', groupController.router);
    app.use(errorHandler);

    app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

    process
      .on('unhandledRejection', (reason) =>
        logger.error('UnhandledRejection', reason)
      )
      .on('uncaughtException', (err) => {
        logger.error('UncaughtException', err.message);
        process.exit(1);
      });
  } catch (e) {
    throw e;
  }
})();
