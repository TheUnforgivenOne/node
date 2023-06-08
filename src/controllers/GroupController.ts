import { Router, RouterOptions } from 'express';
import catchErrors from '../decorators/catchErrors';
import checkToken from '../middlewares/checkToken';
import GroupService from '../services/GroupService';
import {
  validateNewGroup,
  validateUpdatedGroup,
} from '../validators/validateGroup';

class GroupController {
  public router: Router;

  constructor(options?: RouterOptions) {
    this.router = Router(options);
    this.router.get('/:id', checkToken, this.getOne);
    this.router.get('/', checkToken, this.getMany);
    this.router.post('/', checkToken, validateNewGroup, this.create);
    this.router.put('/:id', checkToken, validateUpdatedGroup, this.update);
    this.router.delete('/:id', checkToken, this.delete);
    this.router.post('/addTo/:id', checkToken, this.addUsersToGroup);
  }

  @catchErrors
  private async getOne(req, res) {
    const { id } = req.params;

    const data = await GroupService.getGroup(id);

    res.json({ data });
  }

  @catchErrors
  private async getMany(req, res) {
    const data = await GroupService.getGroups();

    res.json({ data });
  }

  @catchErrors
  private async create(req, res) {
    const newData = req.body;

    const data = await GroupService.createGroup(newData);

    res.json({ data });
  }

  @catchErrors
  private async update(req, res) {
    const { id } = req.params;
    const updatedData = req.body;

    const data = await GroupService.updateGroup(id, updatedData);

    res.json({ data });
  }

  @catchErrors
  private async delete(req, res) {
    const { id } = req.params;

    const data = await GroupService.deleteGroup(id);

    res.json({ data });
  }

  @catchErrors
  private async addUsersToGroup(req, res) {
    const { id } = req.params;
    const { userIds } = req.body;

    const data = await GroupService.addUsersToGroup(id, userIds);

    res.json({ data });
  }
}

export default GroupController;
