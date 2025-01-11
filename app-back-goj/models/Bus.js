const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busNumber: { type: String, required: true },
  lastUpdate: { type: Date, default: Date.now },
  status: { type: String, maxlength: 128 },
  currentLocation: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
});

module.exports = mongoose.model("Bus", busSchema, "Bus");