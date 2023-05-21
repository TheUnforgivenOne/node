import { IGroup, INewGroup, IUser } from '../types/entities';
import { v4 as uuid } from 'uuid';
import GroupRepository from '../data-access/repositories/GroupRepository';
import getDbConnection from '../data-access/dbConnection';
import getUserModel from '../data-access/models/UserModel';
import getGroupModel from '../data-access/models/GroupModel';
import getUserGroupModel from '../data-access/models/UserGroupModel';

class GroupService {
  async getGroup(id: string) {
    return await GroupRepository.getById(id);
  }

  async getGroups() {
    return await GroupRepository.getAll();
  }

  async createGroup(newGroup: INewGroup) {
    const newId = uuid();
    const groupDTO: IGroup = { id: newId, ...newGroup };

    return await GroupRepository.create(groupDTO);
  }

  async updateGroup(id: string, properties: Partial<IGroup>) {
    const groupDTO: Partial<IGroup> = { id, ...properties };

    await GroupRepository.update(groupDTO);

    return GroupRepository.getById(id);
  }

  async deleteGroup(id: string) {
    await GroupRepository.delete(id);

    return { message: 'OK' };
  }

  async addUsersToGroup(groupId: string, usersIds: string[]) {
    const transaction = await getDbConnection().transaction();

    const group = await getGroupModel().findOne({
      where: { id: groupId },
      transaction,
      raw: true,
    });
    if (!group) return 'No group found';

    try {
      const users = await getUserModel().findAll({
        where: {
          id: usersIds,
          isDeleted: false,
        },
        transaction,
        raw: true,
      });

      const usersGroups = await getUserGroupModel().bulkCreate(
        users.map((user: IUser) => {
          const relationId = uuid();
          return {
            id: relationId,
            userId: user.id,
            groupId: group.id,
          };
        }),
        {
          transaction,
        }
      );

      await transaction.commit();
      return usersGroups;
    } catch (e) {
      await transaction.rollback();
      return e;
    }
  }
}

export default new GroupService();
