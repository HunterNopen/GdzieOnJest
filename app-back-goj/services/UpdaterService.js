const Bus = require('../models/Bus');
const User = require('../models/User');
const Stop = require('../models/Stop');
const Route = require('../models/Route');
const Location = require('../models/Location');

const seedData = async () => {
    try {
      await Bus.deleteMany();
      await User.deleteMany();
      await Stop.deleteMany();
      await Route.deleteMany();
      await Location.deleteMany();

      console.log('Cleared existing data.');

      const locations = await Location.insertMany([
        { id: 1, zone: 'Zone 1', area: 'Area A', coordinates: '52.2296756,21.0122287' },
        { id: 2, zone: 'Zone 2', area: 'Area B', coordinates: '51.107883,17.038538' },
      ]);

      const routes = await Route.insertMany([
        { routeName: 'Route A', stops: [], stopsIds: []},
        { routeName: 'Route BBB', stops: [], stopsIds: [], schedule: null },
      ]);

      const stops = await Stop.insertMany([
        { locationName: 'Stop 1', busesIds: [], buses: [], routeId: routes[0]._id },
        { locationName: 'Stop 2', busesIds: [], buses: [], routeId: routes[1]._id },
      ]);

      const buses = await Bus.insertMany([
        { busNumber: 'PKS-TOMEK-EXPRESSS', lastUpdate: new Date(), status: 'Active', currentLocation: locations[0]._id, locationId: locations[0]._id, route: routes[0]._id, routeId: routes[0].id },
        { busNumber: 'PKS-TOMEK2-EXPRESS', lastUpdate: new Date(), status: 'Active', currentLocation: locations[1]._id, locationId: locations[1]._id, route: routes[1]._id, routeId: routes[1].id },
      ]);

      const users = await User.insertMany([
        { userName: 'John', userSurname: 'Doe', preferences: null, searchHistory: [], permissions: [], role: 'Admin', lastModified: new Date() },
        { userName: 'Jane', userSurname: 'Doe', preferences: null, searchHistory: [], permissions: [], role: 'User', lastModified: new Date() },
      ]);
  
      await Bus.insertMany(buses);
      await User.insertMany(users);
      await Stop.insertMany(stops);
      await Route.insertMany(routes);
      await Location.insertMany(locations);
      console.log('Successfully seeded data.');
    } catch (err) {
      console.error('Error seeding data:', err.message);
    }
};

module.exports = seedData;