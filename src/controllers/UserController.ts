import { Router, RouterOptions } from 'express';
import catchErrors from '../decorators/catchErrors';
import checkToken from '../middlewares/checkToken';
import UserService from '../services/UserService';
import {
  validateNewUser,
  validateUpdatedUser,
} from '../validators/validateUser';

class UserController {
  private userService: typeof UserService;
  public router: Router;

  constructor({
    options,
    userService,
  }: {
    options?: RouterOptions;
    userService: typeof UserService;
  }) {
    this.userService = userService;
    this.router = Router(options);
    this.router.get('/:id', checkToken, this.getOne);
    this.router.get('/', checkToken, this.getMany);
    this.router.post('/', checkToken, validateNewUser, this.create);
    this.router.put('/:id', checkToken, validateUpdatedUser, this.update);
    this.router.delete('/:id', checkToken, this.delete);
    this.router.post('/login', this.login);
  }

  @catchErrors
  public async getOne(req, res) {
    const { id: userId } = req.params;

    const user = await this.userService.getUser(userId);

    res.json({ data: { user } });
  }

  @catchErrors
  public async getMany(req, res) {
    const users = await this.userService.getUsers(req.query);

    res.json({ data: { users } });
  }

  @catchErrors
  public async create(req, res) {
    const newUserData = req.body;

    const newUser = await this.userService.createUser(newUserData);

    res.json({ data: { newUser } });
  }

  @catchErrors
  public async update(req, res) {
    const { id: userId } = req.params;
    const updatedData = req.body;

    const updatedUser = await this.userService.updateUser(userId, updatedData);

    res.json({ data: { updatedUser } });
  }

  @catchErrors
  public async delete(req, res) {
    const { id: userId } = req.params;

    const deletedUser = await this.userService.deleteUser(userId);

    res.json({ data: { deletedUser } });
  }

  @catchErrors
  public async login(req, res) {
    const { username, password } = req.body;

    const result = await this.userService.login(username, password);

    res.json(result);
  }
}

export default UserController;
