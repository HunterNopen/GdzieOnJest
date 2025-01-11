const stopRepo = require('../repositories/StopRepository');

const addNewStop = async (stopData) => {
  return await stopRepo.createStop(stopData);
};

const getAllStops = async () => {
  return await stopRepo.findAllStops();
};

const getStopById = async (id) => {
  return await stopRepo.findStopById(id);
};

const modifyStop = async (id, data) => {
  return await stopRepo.updateStop(id, data);
};

const removeStop = async (id) => {
  return await stopRepo.deleteStop(id);
};

module.exports = {
  addNewStop,
  getAllStops,
  getStopById,
  modifyStop,
  removeStop,
};