const Bus = require('../models/Bus');

const createBus = async (data) => {
  const bus = new Bus(data);
  return await bus.save(bus);
};

const findAllBuses = async () => {
  return await Bus.find();
};

const findBusById = async (id) => {
  return await Bus.findById(id);
};

const updateBus = async (id, data) => {
  return await Bus.findByIdAndUpdate(id, data, { new: true });
};

const deleteBus = async (id) => {
  return await Bus.findByIdAndDelete(id);
};

module.exports = {
  createBus,
  findAllBuses,
  findBusById,
  updateBus,
  deleteBus,
};
