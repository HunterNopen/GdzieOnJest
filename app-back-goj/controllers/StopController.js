const stopService = require('../services/StopService');

const createStop = async (req, res) => {
  try {
    const stop = await stopService.addNewStop(req.body);
    res.status(201).json(stop);
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
};

const getAllStops = async (req, res) => {
  try {
    const stops = await stopService.getAllStops();
    res.status(200).json(stops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStopById = async (req, res) => {
  try {
    const stop = await stopService.getStopById(req.params.id);
    if (!stop) return res.status(404).json({ message: 'Stop not found' });
    res.status(200).json(stop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStop = async (req, res) => {
  try {
    const updatedStop = await stopService.modifyStop(req.params.id, req.body);
    if (!updatedStop) return res.status(404).json({ message: 'Stop not found' });
    res.status(200).json(updatedStop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteStop = async (req, res) => {
  try {
    const deletedStop = await stopService.removeStop(req.params.id);
    if (!deletedStop) return res.status(404).json({ message: 'Stop not found' });
    res.status(200).json(deletedStop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createStop,
  getAllStops,
  getStopById,
  updateStop,
  deleteStop,
};