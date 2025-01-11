const Location = require('../models/Location');

const createLocation = async (data) => {
  const location = new Location(data);
  return await location.save(location);
};

const findAllLocations = async () => {
  return await Location.find();
};

const findLocationById = async (id) => {
  return await Location.findById(id);
};

const updateLocation = async (id, data) => {
  return await Location.findByIdAndUpdate(id, data, { new: true });
};

const deleteLocation = async (id) => {
  return await Location.findByIdAndDelete(id);
};

module.exports = {
  createLocation,
  findAllLocations,
  findLocationById,
  updateLocation,
  deleteLocation,
};