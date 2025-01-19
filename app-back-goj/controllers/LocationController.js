const locationService = require('../services/LocationService');

const createLocation = async (req, res) => {
  try {
    const location = await locationService.addNewLocation(req.body);
    res.status(201).json(location);
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
};

const getAllLocations = async (req, res) => {
  try {
    const locations = await locationService.getAllLocations();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLocationById = async (req, res) => {
  try {
    const location = await locationService.getLocationById(req.params.id);
    if (!location) return res.status(404).json({ message: 'Location not found' });
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLocation = async (req, res) => {
  try {
    const updatedLocation = await locationService.modifyLocation(req.params.id, req.body);
    if (!updatedLocation) return res.status(404).json({ message: 'Location not found' });
    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteLocation = async (req, res) => {
  try {
    const deletedLocation = await locationService.removeLocation(req.params.id);
    if (!deletedLocation) return res.status(404).json({ message: 'Location not found' });
    res.status(200).json(deletedLocation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
};