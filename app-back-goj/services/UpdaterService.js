const connectDB = require('../configs/db');
const Bus = require('../models/Bus');

const seedData = async () => {
    try {
      await Bus.deleteMany();
      console.log('Cleared existing data.');
  
      const buses = [
        { busNumber: 'PKS-TOMEK-EXPRESS', route: 'Route A', currentLocation: { latitude: 52.2296756, longitude: 21.0122287 }, createdAt: new Date('2021-09-01T08:00:00Z') },
        { busNumber: 'PKS-TOMEK2-EXPRESS', route: 'Route B', currentLocation: { latitude: 51.107883, longitude: 17.038538 }, createdAt: new Date('2021-09-01T08:00:00Z') },
      ];
  
      await Bus.insertMany(buses);
      console.log('Successfully seeded data.');
    } catch (err) {
      console.error('Error seeding data:', err.message);
    }
};

module.exports = seedData;