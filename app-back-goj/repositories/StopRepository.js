const Stop = require('../models/Stop');

const createStop = async (data) => {
  const stop = new Stop(data);
  return await stop.save(stop);
};

const findAllStops = async () => {
  return await Stop.find();
};

const findStopById = async (id) => {
  return await Stop.findById(id);
};

const updateStop = async (id, data) => {
  return await Stop.findByIdAndUpdate(id, data, { new: true });
};

const deleteStop = async (id) => {
  return await Stop.findByIdAndDelete(id);
};

module.exports = {
  createStop,
  findAllStops,
  findStopById,
  updateStop,
  deleteStop,
};