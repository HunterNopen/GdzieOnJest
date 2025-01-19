const UserService = require('../../../app-back-goj/services/UserService');
const userRepo = require('../../../app-back-goj/repositories/UserRepository');

jest.mock('../../../app-back-goj/repositories/UserRepository');

describe('UserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addNewUser', () => {
    it('should add a new user and return the created user', async () => {
      const userData = { username: 'TestUser', email: 'test@example.com' };
      const createdUser = { _id: '1', ...userData };
      userRepo.createUser.mockResolvedValue(createdUser);

      const result = await UserService.addNewUser(userData);

      expect(userRepo.createUser).toHaveBeenCalledWith(userData);
      expect(result).toEqual(createdUser);
    });

    it('should throw an error if creation fails', async () => {
      const userData = { username: 'TestUser', email: 'test@example.com' };
      const error = new Error('Creation failed');
      userRepo.createUser.mockRejectedValue(error);

      await expect(UserService.addNewUser(userData)).rejects.toThrow('Creation failed');
      expect(userRepo.createUser).toHaveBeenCalledWith(userData);
    });
  });

  describe('getAllUsers', () => {
    it('should return a list of all users', async () => {
      const users = [
        { _id: '1', username: 'User1', email: 'user1@example.com' },
        { _id: '2', username: 'User2', email: 'user2@example.com' },
      ];
      userRepo.findAllUsers.mockResolvedValue(users);

      const result = await UserService.getAllUsers();

      expect(userRepo.findAllUsers).toHaveBeenCalled();
      expect(result).toEqual(users);
    });

    it('should throw an error if retrieval fails', async () => {
      const error = new Error('Retrieval failed');
      userRepo.findAllUsers.mockRejectedValue(error);

      await expect(UserService.getAllUsers()).rejects.toThrow('Retrieval failed');
      expect(userRepo.findAllUsers).toHaveBeenCalled();
    });
  });

  describe('getUserById', () => {
    it('should return the user if found', async () => {
      const user = { _id: '1', username: 'User1', email: 'user1@example.com' };
      userRepo.findUserById.mockResolvedValue(user);

      const result = await UserService.getUserById('1');

      expect(userRepo.findUserById).toHaveBeenCalledWith('1');
      expect(result).toEqual(user);
    });

    it('should return null if user not found', async () => {
      userRepo.findUserById.mockResolvedValue(null);

      const result = await UserService.getUserById('unknown');

      expect(userRepo.findUserById).toHaveBeenCalledWith('unknown');
      expect(result).toBeNull();
    });

    it('should throw an error if retrieval fails', async () => {
      const error = new Error('Retrieval failed');
      userRepo.findUserById.mockRejectedValue(error);

      await expect(UserService.getUserById('1')).rejects.toThrow('Retrieval failed');
      expect(userRepo.findUserById).toHaveBeenCalledWith('1');
    });
  });

  describe('modifyUser', () => {
    it('should update the user and return the updated user', async () => {
      const updateData = { username: 'UpdatedUser', email: 'updated@example.com' };
      const updatedUser = { _id: '1', ...updateData };
      userRepo.updateUser.mockResolvedValue(updatedUser);

      const result = await UserService.modifyUser('1', updateData);

      expect(userRepo.updateUser).toHaveBeenCalledWith('1', updateData);
      expect(result).toEqual(updatedUser);
    });

    it('should return null if user to update is not found', async () => {
      const updateData = { username: 'UpdatedUser', email: 'updated@example.com' };
      userRepo.updateUser.mockResolvedValue(null);

      const result = await UserService.modifyUser('unknown', updateData);

      expect(userRepo.updateUser).toHaveBeenCalledWith('unknown', updateData);
      expect(result).toBeNull();
    });

    it('should throw an error if update fails', async () => {
      const updateData = { username: 'UpdatedUser', email: 'updated@example.com' };
      const error = new Error('Update failed');
      userRepo.updateUser.mockRejectedValue(error);

      await expect(UserService.modifyUser('1', updateData)).rejects.toThrow('Update failed');
      expect(userRepo.updateUser).toHaveBeenCalledWith('1', updateData);
    });
  });

  describe('removeUser', () => {
    it('should remove the user and return the deleted user', async () => {
      const deletedUser = { _id: '1', username: 'RemovedUser', email: 'removed@example.com' };
      userRepo.deleteUser.mockResolvedValue(deletedUser);

      const result = await UserService.removeUser('1');

      expect(userRepo.deleteUser).toHaveBeenCalledWith('1');
      expect(result).toEqual(deletedUser);
    });

    it('should return null if user to delete is not found', async () => {
      userRepo.deleteUser.mockResolvedValue(null);

      const result = await UserService.removeUser('unknown');

      expect(userRepo.deleteUser).toHaveBeenCalledWith('unknown');
      expect(result).toBeNull();
    });

    it('should throw an error if deletion fails', async () => {
      const error = new Error('Deletion failed');
      userRepo.deleteUser.mockRejectedValue(error);

      await expect(UserService.removeUser('1')).rejects.toThrow('Deletion failed');
      expect(userRepo.deleteUser).toHaveBeenCalledWith('1');
    });
  });
});