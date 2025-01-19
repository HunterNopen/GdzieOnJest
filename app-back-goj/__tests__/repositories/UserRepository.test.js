const UserRepository = require('../../../app-back-goj/repositories/UserRepository');
const User = require('../../../app-back-goj/models/User');

jest.mock('../../../app-back-goj/models/User');

describe('UserRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a new user and return the created user', async () => {
      const userData = { username: 'TestUser', email: 'test@example.com' };
      const createdUser = { _id: '1', ...userData };

      const saveMock = jest.fn().mockResolvedValue(createdUser);
      User.mockImplementation(() => ({
        save: saveMock,
      }));

      const result = await UserRepository.createUser(userData);

      expect(User).toHaveBeenCalledWith(userData);
      expect(saveMock).toHaveBeenCalled();
      expect(result).toEqual(createdUser);
    });

    it('should throw an error if creation fails', async () => {
      const userData = { username: 'TestUser', email: 'test@example.com' };
      const error = new Error('Creation failed');

      const saveMock = jest.fn().mockRejectedValue(error);
      User.mockImplementation(() => ({
        save: saveMock,
      }));

      await expect(UserRepository.createUser(userData)).rejects.toThrow('Creation failed');

      expect(User).toHaveBeenCalledWith(userData);
      expect(saveMock).toHaveBeenCalled();
    });
  });

  describe('findAllUsers', () => {
    it('should return a list of all users', async () => {
      const users = [
        { _id: '1', username: 'UserOne', email: 'userone@example.com' },
        { _id: '2', username: 'UserTwo', email: 'usertwo@example.com' },
      ];

      User.find.mockResolvedValue(users);

      const result = await UserRepository.findAllUsers();

      expect(User.find).toHaveBeenCalledWith();
      expect(result).toEqual(users);
    });

    it('should throw an error if retrieval fails', async () => {
      const error = new Error('Retrieval failed');
      User.find.mockRejectedValue(error);

      await expect(UserRepository.findAllUsers()).rejects.toThrow('Retrieval failed');

      expect(User.find).toHaveBeenCalledWith();
    });
  });

  describe('findUserById', () => {
    it('should return the user if found', async () => {
      const user = { _id: '1', username: 'UserOne', email: 'userone@example.com' };
      User.findById.mockResolvedValue(user);

      const result = await UserRepository.findUserById('1');

      expect(User.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(user);
    });

    it('should return null if user not found', async () => {
      User.findById.mockResolvedValue(null);

      const result = await UserRepository.findUserById('unknown');

      expect(User.findById).toHaveBeenCalledWith('unknown');
      expect(result).toBeNull();
    });

    it('should throw an error if retrieval fails', async () => {
      const error = new Error('Retrieval failed');
      User.findById.mockRejectedValue(error);

      await expect(UserRepository.findUserById('1')).rejects.toThrow('Retrieval failed');

      expect(User.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('updateUser', () => {
    it('should update the user and return the updated user', async () => {
      const updateData = { username: 'UpdatedUser', email: 'updated@example.com' };
      const updatedUser = { _id: '1', ...updateData };
      User.findByIdAndUpdate.mockResolvedValue(updatedUser);

      const result = await UserRepository.updateUser('1', updateData);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith('1', updateData, { new: true });
      expect(result).toEqual(updatedUser);
    });

    it('should return null if user to update is not found', async () => {
      const updateData = { username: 'UpdatedUser', email: 'updated@example.com' };
      User.findByIdAndUpdate.mockResolvedValue(null);

      const result = await UserRepository.updateUser('unknown', updateData);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith('unknown', updateData, { new: true });
      expect(result).toBeNull();
    });

    it('should throw an error if update fails', async () => {
      const updateData = { username: 'UpdatedUser', email: 'updated@example.com' };
      const error = new Error('Update failed');
      User.findByIdAndUpdate.mockRejectedValue(error);

      await expect(UserRepository.updateUser('1', updateData)).rejects.toThrow('Update failed');

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith('1', updateData, { new: true });
    });
  });

  describe('deleteUser', () => {
    it('should delete the user and return the deleted user', async () => {
      const deletedUser = { _id: '1', username: 'UserOne', email: 'userone@example.com' };
      User.findByIdAndDelete.mockResolvedValue(deletedUser);

      const result = await UserRepository.deleteUser('1');

      expect(User.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(result).toEqual(deletedUser);
    });

    it('should return null if user to delete is not found', async () => {
      User.findByIdAndDelete.mockResolvedValue(null);

      const result = await UserRepository.deleteUser('unknown');

      expect(User.findByIdAndDelete).toHaveBeenCalledWith('unknown');
      expect(result).toBeNull();
    });

    it('should throw an error if deletion fails', async () => {
      const error = new Error('Deletion failed');
      User.findByIdAndDelete.mockRejectedValue(error);

      await expect(UserRepository.deleteUser('1')).rejects.toThrow('Deletion failed');

      expect(User.findByIdAndDelete).toHaveBeenCalledWith('1');
    });
  });
});