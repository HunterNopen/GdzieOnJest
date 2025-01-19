const routeRepo = require('../repositories/RouteRepository');

const addNewRoute = async (routeData) => {
  return await routeRepo.createRoute(routeData);
};

const getAllRoutes = async () => {
  return await routeRepo.findAllRoutes();
};

const getRouteById = async (id) => {
  return await routeRepo.findRouteById(id);
};

const modifyRoute = async (id, data) => {
  return await routeRepo.updateRoute(id, data);
};

const removeRoute = async (id) => {
  return await routeRepo.deleteRoute(id);
};

module.exports = {
  addNewRoute,
  getAllRoutes,
  getRouteById,
  modifyRoute,
  removeRoute,
};