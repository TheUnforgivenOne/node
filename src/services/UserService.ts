import { IUser, INewUser } from '../types/entities';
import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';
import UserRepository from '../data-access/repositories/UserRepository';

class UserService {
  async getUser(id: string) {
    return await UserRepository.getById(id);
  }

  async getUsers(query?: { login?: string; limit?: number }) {
    let dbQuery = { login: query?.login ?? '', limit: query?.limit ?? 100 };

    return await UserRepository.getMany(dbQuery);
  }

  async createUser(newUser: INewUser) {
    const newId = uuid();
    const userDTO: IUser = { id: newId, isDeleted: false, ...newUser };

    return await UserRepository.create(userDTO);
  }

  async updateUser(id: string, properties: Partial<IUser>) {
    const userDTO: Partial<IUser> = { id, ...properties };

    await UserRepository.update(userDTO);

    return await UserRepository.getById(id);
  }

  async deleteUser(id: string) {
    await UserRepository.delete(id);

    return await UserRepository.getById(id);
  }

  async login(username: string, password: string) {
    const users = await UserRepository.getMany({ login: username, limit: 1 });

    if (!users.length || users?.[0]?.password !== password) {
      throw new Error('Wrong username or password');
    }

    const token = jwt.sign(
      { username },
      process.env.JWT_SECRET ?? 'easy_secret'
    );
    return { token };
  }
}

export default new UserService();
