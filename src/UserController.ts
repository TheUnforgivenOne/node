import UserService from './UserService';
import {
  mapErrors,
  validateNewUser,
  validateUpdatedUser,
} from './validators/validateUser';

class UserController {
  async getUser(req, res) {
    const { id } = req.params;

    const user = await UserService.getUser(id);
    if (!user) return res.status(400).json({ message: 'No user found' });

    res.json({ data: { user } });
  }

  async getUsers(req, res) {
    const users = await UserService.getUsers(req.query);
    if (!users.length)
      return res.status(400).json({ message: 'No users found' });

    res.json({ data: { users } });
  }

  async createUser(req, res) {
    const newUserData = req.body;

    const { error } = validateNewUser(newUserData);
    if (error?.isJoi)
      return res.status(400).json({ message: mapErrors(error) });

    const newUser = await UserService.createUser(newUserData);
    if (!newUser) return res.status(500).json({ message: 'Some server error' });

    res.json({ data: { newUser } });
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const newUserData = req.body;

    const { error } = validateUpdatedUser(newUserData);
    if (error?.isJoi)
      return res.status(400).json({ message: mapErrors(error) });

    const updatedUser = await UserService.updateUser(id, newUserData);
    if (!updatedUser)
      return res.status(500).json({ message: 'Some server error' });

    res.json({ data: { updatedUser } });
  }

  async deleteUser(req, res) {
    const { id } = req.params;

    const deletedUser = await UserService.deleteUser(id);
    if (!deletedUser) return res.status(400).json({ message: 'No user found' });

    res.json({ data: { deletedUser } });
  }
}

export default new UserController();
