const User = require('../models/User');

const createUser = async (data) => {
  const user = new User(data);
  return await user.save(user);
};

const findAllUsers = async () => {
  return await User.find();
};

const findUserById = async (id) => {
  return await User.findById(id);
};

const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  createUser,
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser,
};