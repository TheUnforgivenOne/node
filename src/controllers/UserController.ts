import { Router, RouterOptions } from 'express';
import UserService from '../services/UserService';
import {
  validateNewUser,
  validateUpdatedUser,
} from '../validators/validateUser';

class UserController {
  public router: Router;

  constructor(options?: RouterOptions) {
    this.router = Router(options);
    this.router.get('/:id', this.getUser);
    this.router.get('/', this.getUsers);
    this.router.post('/', validateNewUser, this.createUser);
    this.router.put('/:id', validateUpdatedUser, this.updateUser);
    this.router.delete('/:id', this.deleteUser);
  }

  private async getUser(req, res) {
    const { id: userId } = req.params;

    const user = await UserService.getUser(userId);

    res.json({ data: { user } });
  }

  private async getUsers(req, res) {
    const users = await UserService.getUsers(req.query);

    res.json({ data: { users } });
  }

  private async createUser(req, res) {
    const newUserData = req.body;

    const newUser = await UserService.createUser(newUserData);

    res.json({ data: { newUser } });
  }

  private async updateUser(req, res) {
    const { id: userId } = req.params;
    const updatedData = req.body;

    const updatedUser = await UserService.updateUser(userId, updatedData);

    res.json({ data: { updatedUser } });
  }

  private async deleteUser(req, res) {
    const { id: userId } = req.params;

    const deletedUser = await UserService.deleteUser(userId);

    res.json({ data: { deletedUser } });
  }
}

export default UserController;
