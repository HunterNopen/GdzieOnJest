const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === 'test') {
      console.log('Skipping DB connection in test environment.');
      return;
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected Successfully!');
  } catch (error) {
    console.error('MongoDB Connection Failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
