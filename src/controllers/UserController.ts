import { Router, RouterOptions } from 'express';
import catchErrors from '../decorators/catchErrors';
import checkToken from '../middlewares/checkToken';
import UserService from '../services/UserService';
import {
  validateNewUser,
  validateUpdatedUser,
} from '../validators/validateUser';

class UserController {
  public router: Router;

  constructor(options?: RouterOptions) {
    this.router = Router(options);
    this.router.get('/:id', checkToken, this.getOne);
    this.router.get('/', checkToken, this.getMany);
    this.router.post('/', checkToken, validateNewUser, this.create);
    this.router.put('/:id', checkToken, validateUpdatedUser, this.update);
    this.router.delete('/:id', checkToken, this.delete);
    this.router.post('/login', this.login);
  }

  @catchErrors
  private async getOne(req, res) {
    const { id: userId } = req.params;

    const user = await UserService.getUser(userId);

    res.json({ data: { user } });
  }

  @catchErrors
  private async getMany(req, res) {
    const users = await UserService.getUsers(req.query);

    res.json({ data: { users } });
  }

  @catchErrors
  private async create(req, res) {
    const newUserData = req.body;

    const newUser = await UserService.createUser(newUserData);

    res.json({ data: { newUser } });
  }

  @catchErrors
  private async update(req, res) {
    const { id: userId } = req.params;
    const updatedData = req.body;

    const updatedUser = await UserService.updateUser(userId, updatedData);

    res.json({ data: { updatedUser } });
  }

  @catchErrors
  private async delete(req, res) {
    const { id: userId } = req.params;

    const deletedUser = await UserService.deleteUser(userId);

    res.json({ data: { deletedUser } });
  }

  @catchErrors
  private async login(req, res) {
    const { username, password } = req.body;

    const result = await UserService.login(username, password);

    res.json(result);
  }
}

export default UserController;
