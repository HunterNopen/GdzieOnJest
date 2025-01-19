const Route = require('../models/Route');

const createRoute = async (data) => {
  const route = new Route(data);
  return await route.save(route);
};

const findAllRoutes = async () => {
  return await Route.find();
};

const findRouteById = async (id) => {
  return await Route.findById(id);
};

const updateRoute = async (id, data) => {
  return await Route.findByIdAndUpdate(id, data, { new: true });
};

const deleteRoute = async (id) => {
  return await Route.findByIdAndDelete(id);
};

module.exports = {
  createRoute,
  findAllRoutes,
  findRouteById,
  updateRoute,
  deleteRoute,
};