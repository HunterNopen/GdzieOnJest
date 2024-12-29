const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  routeName: { type: String, maxlength: 128, required: true },
  stops: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stop' }],
  stopsIds: [{ type: mongoose.Schema.Types.ObjectId }],
  schedule: { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' },
  lastUpdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Route", routeSchema, "Route");
