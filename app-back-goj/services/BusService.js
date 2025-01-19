const busRepo = require('../repositories/BusRepository');

const addNewBus = async (busData) => {
  return await busRepo.createBus(busData);
};

const getAllBuses = async () => {
  return await busRepo.findAllBuses();
};

const getBusById = async (id) => {
  return await busRepo.findBusById(id);
};

const modifyBus = async (id, data) => {
  return await busRepo.updateBus(id, data);
};

const removeBus = async (id) => {
  return await busRepo.deleteBus(id);
};

module.exports = {
  addNewBus,
  getAllBuses,
  getBusById,
  modifyBus,
  removeBus,
};
