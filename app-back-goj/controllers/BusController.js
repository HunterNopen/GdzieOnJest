const busService = require('../services/BusService');

const createBus = async (req, res) => {
  try {
    const bus = await busService.addNewBus(req.body);
    res.status(201).json(bus);
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
};
const getAllBuses = async (req, res) => {
  try {
    const buses = await busService.getAllBuses();
    res.status(200).json(buses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBusById = async (req, res) => {
  try {
    const bus = await busService.getBusById(req.params.id);
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    res.status(200).json(bus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBus = async (req, res) => {
  try {
    const updatedBus = await busService.modifyBus(req.params.id, req.body);
    if (!updatedBus) return res.status(404).json({ message: 'Bus not found' });
    res.status(200).json(updatedBus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBus = async (req, res) => {
  try {
    const deletedBus = await busService.removeBus(req.params.id);
    if (!deletedBus) return res.status(404).json({ message: 'Bus not found' });
    res.status(200).json(deletedBus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBus,
  getAllBuses,
  getBusById,
  updateBus,
  deleteBus,
};
