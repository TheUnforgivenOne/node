import { Router } from 'express';
import UserController from './UserController';

const UserRouter = Router();
UserRouter.get('/:id', UserController.getUser);
UserRouter.get('/', UserController.getUsers);
UserRouter.post('/', UserController.createUser);
UserRouter.put('/:id', UserController.updateUser);
UserRouter.delete('/:id', UserController.deleteUser);

export default UserRouter;
