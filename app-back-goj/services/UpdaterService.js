const mongoose = require('mongoose');
const Bus = require('../models/Bus');
const User = require('../models/User');
const Stop = require('../models/Stop');
const Route = require('../models/Route');
const Location = require('../models/Location');

const seedLocations = async () => {
  return await Location.insertMany([
    { zone: 'Zone 1', area: 'Area A', coordinates: '52.2296756,21.0122287' },
    { zone: 'Zone 2', area: 'Area B', coordinates: '51.107883,17.038538' },
  ]);
};

const seedRoutes = async () => {
  return await Route.insertMany([
    { routeName: 'Route A', stopIds: [] },
    { routeName: 'Route BBB', stopIds: [] },
  ]);
};

const seedStops = async (routes) => {
  return await Stop.insertMany([
    { locationName: 'Stop 1', busIds: [], routeId: routes[0]._id },
    { locationName: 'Stop 2', busIds: [], routeId: routes[1]._id },
  ]);
};

const seedBuses = async (locations, routes) => {
  return await Bus.insertMany([
    {
      busNumber: 'PKS-TOMEK-EXPRESSS',
      status: 'Active',
      currentLocation: locations[0]._id,
      locationId: locations[0]._id,
      routeId: routes[0]._id
    },
    {
      busNumber: 'PKS-TOMEK2-EXPRESS',
      status: 'Active',
      currentLocation: locations[1]._id,
      locationId: locations[1]._id,
      routeId: routes[1]._id,
    },
  ]);
};

const seedUsers = async () => {
  return await User.insertMany([
    { userName: 'John', userSurname: 'Doe', role: 'Admin' },
    { userName: 'Jane', userSurname: 'Doe', role: 'User' },
  ]);
};

const clearDatabase = async () => {
  await Promise.all([
    Bus.deleteMany(),
    User.deleteMany(),
    Stop.deleteMany(),
    Route.deleteMany(),
    Location.deleteMany(),
  ]);
  console.log('Cleared existing data.');
};

const verifyData = async () => {
  try {
    const bus = await Bus.findOne({ busNumber: 'PKS-TOMEK-EXPRESSS' });
    if (bus) {
      console.log(`Found bus: ${bus.busNumber}`);
    } else {
      console.error(`Bus with name ${bus.busNumber} not found`);
    }

    const route = await Route.findOne({ routeName: 'Route A' });
    if (route) {
      console.log(`Found route: ${route.routeName}`);
    } else {
      console.error(`Route with name ${route.routeName} not found`);
    }

    const location = await Location.findOne({ zone: 'Zone 1' });
    if (location) {
      console.log(`Found location: ${location.zone}`);
    } else {
      console.error(`Location with zone ${route.routeName} not found`);
    }
  } catch (err) {
    console.error('Error during verification:', err.message);
  }
};

const seedData = async () => {
  try {
    await clearDatabase();

    const locations = await seedLocations();
    const routes = await seedRoutes();
    const stops = await seedStops(routes);
    const buses = await seedBuses(locations, routes);
    const users = await seedUsers();

    console.log('Successfully seeded data:');
    console.log(`- ${locations.length} locations`);
    console.log(`- ${routes.length} routes`);
    console.log(`- ${stops.length} stops`);
    console.log(`- ${buses.length} buses`);
    console.log(`- ${users.length} users`);

    await verifyData();
  } catch (err) {
    console.error('Error seeding data:', err.stack);
  }
};

module.exports = seedData;
