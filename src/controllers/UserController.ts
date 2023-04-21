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
    this.router.get('/:id', this.getOne);
    this.router.get('/', this.getMany);
    this.router.post('/', validateNewUser, this.create);
    this.router.put('/:id', validateUpdatedUser, this.update);
    this.router.delete('/:id', this.delete);
  }

  private async getOne(req, res) {
    const { id: userId } = req.params;

    const user = await UserService.getUser(userId);

    res.json({ data: { user } });
  }

  private async getMany(req, res) {
    const users = await UserService.getUsers(req.query);

    res.json({ data: { users } });
  }

  private async create(req, res) {
    const newUserData = req.body;

    const newUser = await UserService.createUser(newUserData);

    res.json({ data: { newUser } });
  }

  private async update(req, res) {
    const { id: userId } = req.params;
    const updatedData = req.body;

    const updatedUser = await UserService.updateUser(userId, updatedData);

    res.json({ data: { updatedUser } });
  }

  private async delete(req, res) {
    const { id: userId } = req.params;

    const deletedUser = await UserService.deleteUser(userId);

    res.json({ data: { deletedUser } });
  }
}

export default UserController;
