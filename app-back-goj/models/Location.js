const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    zone: { type: String, maxlength: 128 },
    area: { type: String, maxlength: 128 },
    coordinates: { type: String, maxlength: 64 }
  });
  
  module.exports = mongoose.model("Location", locationSchema, "Location");
  