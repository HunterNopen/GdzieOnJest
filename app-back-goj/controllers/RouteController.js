const routeService = require('../services/RouteService');

const createRoute = async (req, res) => {
  try {
    const route = await routeService.addNewRoute(req.body);
    res.status(201).json(route);
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
};

const getAllRoutes = async (req, res) => {
  try {
    const routes = await routeService.getAllRoutes();
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRouteById = async (req, res) => {
  try {
    const route = await routeService.getRouteById(req.params.id);
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.status(200).json(route);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRoute = async (req, res) => {
  try {
    const updatedRoute = await routeService.modifyRoute(req.params.id, req.body);
    if (!updatedRoute) return res.status(404).json({ message: 'Route not found' });
    res.status(200).json(updatedRoute);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRoute = async (req, res) => {
  try {
    const deletedRoute = await routeService.removeRoute(req.params.id);
    if (!deletedRoute) return res.status(404).json({ message: 'Route not found' });
    res.status(200).json(deletedRoute);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRoute,
  getAllRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
};