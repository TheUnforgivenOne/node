import { IGroup } from '../../types/entities';
import getGroupModel from '../models/GroupModel';

class GroupRepository {
  async getById(groupId: string) {
    const foundGroup = await getGroupModel().findOne({
      where: { id: groupId },
      raw: true,
    });

    return foundGroup;
  }

  async getAll() {
    const foundGroups = await getGroupModel().findAll({ raw: true });

    return foundGroups;
  }

  async create(groupDTO: IGroup) {
    const newGroup = await getGroupModel().create(groupDTO, { raw: true });

    return newGroup;
  }

  async update(groupDTO: Partial<IGroup>) {
    await getGroupModel().update(groupDTO, { where: { id: groupDTO.id } });
  }

  async delete(groupId) {
    await getGroupModel().destroy({ where: { id: groupId }, cascade: true });
  }
}

export default new GroupRepository();
