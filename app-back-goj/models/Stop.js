const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
    locationName: { type: String, maxlength: 128, required: true },
    lastUpdate: { type: Date, default: Date.now },
    busesIds: [{ type: mongoose.Schema.Types.ObjectId }],
    buses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bus' }],
    routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
  });
  
  module.exports = mongoose.model('Stop', stopSchema, "Stop");
  