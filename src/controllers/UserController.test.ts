import UserService from '../services/UserService';
import UserController from './UserController';
import { IUser } from '../types/entities';

const getMockedResponse = (): Response => {
  return {
    json: jest.fn(),
    status: jest.fn(),
  } as unknown as Response;
};

const getMockUser = (
  id: string,
  login: string,
  password: string,
  age: number
): Partial<IUser> => ({
  id,
  login,
  password,
  age,
});

jest.mock('../services/UserService');
jest.mock('../decorators/catchErrors');

describe('User controller', () => {
  const userService = UserService;
  let userController: UserController;
  let responseMock: Response;

  beforeEach(() => {
    userController = new UserController({ userService });
    responseMock = getMockedResponse();
  });

  it('Create user', async () => {
    const createUserSpy = jest.spyOn(userService, 'createUser');
    const user = getMockUser('1', 'testUser', 'password', 25);
    createUserSpy.mockResolvedValue(user);

    await userController.create({ body: { ...user } }, responseMock);

    expect(createUserSpy).toHaveBeenCalledWith(user);
    expect(responseMock.json).toHaveBeenCalledTimes(1);
    expect(responseMock.json).toHaveBeenCalledWith({
      data: { newUser: user },
    });
  });

  it('Get user', async () => {
    const getUserSpy = jest.spyOn(userService, 'getUser');
    const user = getMockUser('1', 'testUser', 'password', 25);
    getUserSpy.mockResolvedValue(user);

    await userController.getOne({ params: { id: user.id } }, responseMock);

    expect(getUserSpy).toHaveBeenCalledWith(user.id);
    expect(responseMock.json).toHaveBeenCalledTimes(1);
    expect(responseMock.json).toHaveBeenCalledWith({ data: { user } });
  });

  it('Update user', async () => {
    const updateUserSpy = jest.spyOn(userService, 'updateUser');
    const user = getMockUser('1', 'testUser', 'password', 25);
    updateUserSpy.mockResolvedValue(user);

    await userController.update(
      { params: { id: user.id }, body: { ...user } },
      responseMock
    );

    expect(updateUserSpy).toHaveBeenCalledWith(user.id, user);
    expect(responseMock.json).toHaveBeenCalledTimes(1);
    expect(responseMock.json).toHaveBeenCalledWith({
      data: { updatedUser: user },
    });
  });

  it('Delete user', async () => {
    const deleteUserSpy = jest.spyOn(userService, 'deleteUser');
    const user = getMockUser('1', 'testUser', 'password', 25);
    deleteUserSpy.mockResolvedValue(user);

    await userController.delete({ params: { id: user.id } }, responseMock);

    expect(deleteUserSpy).toHaveBeenCalledWith(user.id);
    expect(responseMock.json).toHaveBeenCalledTimes(1);
    expect(responseMock.json).toHaveBeenCalledWith({
      data: { deletedUser: user },
    });
  });
});
