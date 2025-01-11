const userRepo = require('../repositories/UserRepository');

const addNewUser = async (userData) => {
  return await userRepo.createUser(userData);
};

const getAllUsers = async () => {
  return await userRepo.findAllUsers();
};

const getUserById = async (id) => {
  return await userRepo.findUserById(id);
};

const modifyUser = async (id, data) => {
  return await userRepo.updateUser(id, data);
};

const removeUser = async (id) => {
  return await userRepo.deleteUser(id);
};

module.exports = {
  addNewUser,
  getAllUsers,
  getUserById,
  modifyUser,
  removeUser,
};