import express from 'express';
import dotenv from 'dotenv';
import UserController from './controllers/UserController';
import getDbConnection from './data-access/dbConnection';

(async () => {
  try {
    dotenv.config();
    const PORT = process.env.PORT ?? 4000;

    await getDbConnection().authenticate();

    const app = express();
    const userController = new UserController();

    app.use(express.json());

    app.use('/user', userController.router);

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (e) {
    throw e;
  }
})();
