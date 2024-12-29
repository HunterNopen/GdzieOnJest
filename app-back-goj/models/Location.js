const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    zone: { type: String, maxlength: 128 },
    area: { type: String, maxlength: 128 },
    coordinates: { type: String, maxlength: 64 },
    stopLocationId: { type: mongoose.Schema.Types.ObjectId, ref: 'StopLocation' },
  });
  
  module.exports = mongoose.model('Location', locationSchema, "Location");
  