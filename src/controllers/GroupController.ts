import { Router, RouterOptions } from 'express';
import GroupService from '../services/GroupService';

class GroupController {
  public router: Router;

  constructor(options?: RouterOptions) {
    this.router = Router(options);
    this.router.get('/:id', this.getOne);
    this.router.get('/', this.getMany);
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }

  private async getOne(req, res) {
    const { id } = req.params;

    const data = await GroupService.getGroup(id);

    res.json({ data });
  }

  private async getMany(req, res) {
    const data = await GroupService.getGroups();

    res.json({ data });
  }

  private async create(req, res) {
    const newData = req.body;

    const data = await GroupService.createGroup(newData);

    res.json({ data });
  }

  private async update(req, res) {
    const { id } = req.params;
    const updatedData = req.body;

    const data = await GroupService.updateGroup(id, updatedData);

    res.json({ data });
  }

  private async delete(req, res) {
    const { id } = req.params;

    const data = await GroupService.deleteGroup(id);

    res.json({ data });
  }
}

export default GroupController;
