import userData from './mocks/userData';
import { IUser, INewUser } from './types/entities';
import { v4 as uuid } from 'uuid';

const sortByLogin = (user1: IUser, user2: IUser) => {
  if (user1.login < user2.login) return -1;
  if (user1.login > user2.login) return 1;
  return 0;
};

class UserService {
  UserData: IUser[];

  constructor(initialData: IUser[]) {
    this.UserData = initialData;
  }

  getUser(id: string) {
    return this.UserData.find((user) => user.id === id);
  }

  getUsers(query?: { login?: string; limit?: number }) {
    if (!query) return this.UserData;

    const { login = '', limit = 100000 } = query;
    const queriedUsers = this.UserData.filter((user) =>
      user.login.includes(login)
    )?.sort(sortByLogin);

    return queriedUsers.slice(0, limit);
  }

  createUser(newUser: INewUser) {
    const newUserId = uuid();
    this.UserData.push({ ...newUser, id: newUserId, isDeleted: false });

    return this.getUser(newUserId);
  }

  updateUser(id: string, properties: Partial<IUser>) {
    this.UserData = this.UserData.map((user) =>
      user.id === id ? { ...user, ...properties } : user
    );

    return this.getUser(id);
  }

  deleteUser(id: string) {
    this.UserData = this.UserData.map((user) =>
      user.id === id ? { ...user, isDeleted: true } : user
    );

    return this.getUser(id);
  }
}

export default new UserService(userData);
