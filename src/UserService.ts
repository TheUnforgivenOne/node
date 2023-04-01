import userData from './mocks/userData';
import { IUser, INewUser } from './types/entities';
import { v4 as uuid } from 'uuid';
import { UserModel } from '.';
import { Op } from 'sequelize';

class UserService {
  UserData: IUser[];

  constructor(initialData: IUser[]) {
    this.UserData = initialData;
  }

  async getUser(id: string) {
    return await UserModel.findOne({ where: { id }, raw: true });
  }

  async getUsers(query?: { login?: string; limit?: number }) {
    if (!query) return await UserModel.findAll({ raw: true });

    const { login = '', limit = 100000 } = query;
    return await UserModel.findAll({
      where: { login: { [Op.like]: `%${login}%` } },
      limit,
      order: [['login', 'ASC']],
      raw: true,
    });
  }

  async createUser(newUser: INewUser) {
    const newUserId = uuid();

    return await UserModel.create(
      { ...newUser, id: newUserId, isDeleted: false },
      { raw: true }
    );
  }

  async updateUser(id: string, properties: Partial<IUser>) {
    await UserModel.update({ ...properties }, { where: { id } });

    return await this.getUser(id);
  }

  async deleteUser(id: string) {
    await UserModel.update({ isDeleted: true }, { where: { id } });

    return await this.getUser(id);
  }
}

export default new UserService(userData);
