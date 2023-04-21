import { IGroup, INewGroup } from '../types/entities';
import { v4 as uuid } from 'uuid';
import GroupRepository from '../data-access/repositories/GroupRepository';

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
}

export default new GroupService();
