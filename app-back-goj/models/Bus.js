const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busNumber: { type: String, required: true },
  lastUpdate: { type: Date, default: Date.now },
  status: { type: String, maxlength: 128 },
  currentLocation: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
  routeId: { type: Number },
});

module.exports = mongoose.model(null, busSchema, 'Bus');