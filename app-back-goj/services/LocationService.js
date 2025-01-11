const locationRepo = require('../repositories/LocationRepository');

const addNewLocation = async (locationData) => {
  return await locationRepo.createLocation(locationData);
};

const getAllLocations = async () => {
  return await locationRepo.findAllLocations();
};

const getLocationById = async (id) => {
  return await locationRepo.findLocationById(id);
};

const modifyLocation = async (id, data) => {
  return await locationRepo.updateLocation(id, data);
};

const removeLocation = async (id) => {
  return await locationRepo.deleteLocation(id);
};

module.exports = {
  addNewLocation,
  getAllLocations,
  getLocationById,
  modifyLocation,
  removeLocation,
};