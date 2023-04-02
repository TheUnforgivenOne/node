import { Op } from 'sequelize';
import { IUser } from '../../types/entities';
import getUserModel from '../models/UserModel';

class UserRepository {
  async getById(userId: string) {
    const foundUser = await getUserModel().findOne({
      where: { id: userId },
      raw: true,
    });

    return foundUser;
  }

  async getMany(dbQuery: { login: string; limit: number }) {
    const foundUsers = await getUserModel().findAll({
      where: { login: { [Op.like]: `%${dbQuery.login}%` } },
      limit: dbQuery.limit,
      order: [['login', 'ASC']],
      raw: true,
    });

    return foundUsers;
  }

  async create(userDTO: IUser) {
    const newUser = await getUserModel().create(userDTO, { raw: true });

    return newUser;
  }

  async update(userDTO: Partial<IUser>) {
    await getUserModel().update(userDTO, {
      where: { id: userDTO.id },
    });
  }

  async delete(userId: string) {
    await getUserModel().update({ isDeleted: true }, { where: { id: userId } });
  }
}

export default new UserRepository();
