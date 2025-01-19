const UserController = require('../../../app-back-goj/controllers/UserController');
const userService = require('../../../app-back-goj/services/UserService');

jest.mock('../../../app-back-goj/services/UserService');

describe('UserController', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = { params: {}, body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      headersSent: false,
    };
  });

  describe('createUser', () => {
    it('should create a new user and return 201 with the user object', async () => {
      const mockUser = { _id: '1', username: 'TestUser' };
      userService.addNewUser.mockResolvedValue(mockUser);

      mockReq.body = { username: 'TestUser' };
      await UserController.createUser(mockReq, mockRes);

      expect(userService.addNewUser).toHaveBeenCalledWith(mockReq.body);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockUser);
    });

    it('should return 500 if there is an error', async () => {
      userService.addNewUser.mockRejectedValue(new Error('Test error'));

      await UserController.createUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Test error' });
    });
  });

  describe('getAllUsers', () => {
    it('should return 200 and list of users', async () => {
      const mockUsers = [{ _id: '1' }, { _id: '2' }];
      userService.getAllUsers.mockResolvedValue(mockUsers);

      await UserController.getAllUsers(mockReq, mockRes);

      expect(userService.getAllUsers).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockUsers);
    });

    it('should return 500 on error', async () => {
      const error = new Error('GetAll error');
      userService.getAllUsers.mockRejectedValue(error);

      await UserController.getAllUsers(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'GetAll error' });
    });
  });

  describe('getUserById', () => {
    it('should return 200 and the user object if found', async () => {
      const mockUser = { _id: '1', username: 'TestUser' };
      userService.getUserById.mockResolvedValue(mockUser);

      mockReq.params.id = '1';
      await UserController.getUserById(mockReq, mockRes);

      expect(userService.getUserById).toHaveBeenCalledWith('1');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockUser);
    });

    it('should return 404 if user not found', async () => {
      userService.getUserById.mockResolvedValue(null);

      mockReq.params.id = 'unknown';
      await UserController.getUserById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it('should return 500 on error', async () => {
      userService.getUserById.mockRejectedValue(new Error('Test error'));

      await UserController.getUserById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Test error' });
    });
  });

  describe('updateUser', () => {
    it('should return 200 with updated user if successful', async () => {
      const updatedUser = { _id: '1', username: 'UpdatedUser' };
      userService.modifyUser.mockResolvedValue(updatedUser);

      mockReq.params.id = '1';
      mockReq.body = { username: 'UpdatedUser' };
      await UserController.updateUser(mockReq, mockRes);

      expect(userService.modifyUser).toHaveBeenCalledWith('1', { username: 'UpdatedUser' });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(updatedUser);
    });

    it('should return 404 if user not found', async () => {
      userService.modifyUser.mockResolvedValue(null);

      mockReq.params.id = '404';
      await UserController.updateUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it('should return 500 on error', async () => {
      userService.modifyUser.mockRejectedValue(new Error('Update error'));

      await UserController.updateUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Update error' });
    });
  });

  describe('deleteUser', () => {
    it('should return 200 and deleted user if successful', async () => {
      const mockDeleted = { _id: '1', username: 'RemovedUser' };
      userService.removeUser.mockResolvedValue(mockDeleted);

      mockReq.params.id = '1';
      await UserController.deleteUser(mockReq, mockRes);

      expect(userService.removeUser).toHaveBeenCalledWith('1');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockDeleted);
    });

    it('should return 404 if user not found', async () => {
      userService.removeUser.mockResolvedValue(null);

      mockReq.params.id = '404';
      await UserController.deleteUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it('should return 500 on error', async () => {
      userService.removeUser.mockRejectedValue(new Error('Delete error'));

      await UserController.deleteUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Delete error' });
    });
  });
});