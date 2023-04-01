import UserService from './UserService';
import {
  mapErrors,
  validateNewUser,
  validateUpdatedUser,
} from './validators/validateUser';

class UserController {
  getUser(req, res) {
    const { id } = req.params;

    const user = UserService.getUser(id);
    if (!user) return res.status(400).json({ message: 'No user found' });

    res.json({ data: { user } });
  }

  getUsers(req, res) {
    const users = UserService.getUsers(req.query);
    if (!users.length) return res.status(400).json({ message: 'No users found' });

    res.json({ data: { users } });
  }

  createUser(req, res) {
    const newUserData = req.body;

    const { error } = validateNewUser(newUserData);
    if (error?.isJoi) return res.status(400).json({ message: mapErrors(error) });

    const newUser = UserService.createUser(newUserData);
    if (!newUser) return res.status(500).json({ message: 'Some server error' });

    res.json({ data: { newUser } });
  }

  updateUser(req, res) {
    const { id } = req.params;
    const newUserData = req.body;

    const { error } = validateUpdatedUser(newUserData);
    if (error?.isJoi) return res.status(400).json({ message: mapErrors(error) });

    const updatedUser = UserService.updateUser(id, newUserData);
    if (!updatedUser) return res.status(500).json({ message: 'Some server error' });

    res.json({ data: { updatedUser } });
  }

  deleteUser(req, res) {
    const { id } = req.params;

    const deletedUser = UserService.deleteUser(id);
    if (!deletedUser) return res.status(400).json({ message: 'No user found' });

    res.json({ data: { deletedUser } });
  }
}

export default new UserController();
