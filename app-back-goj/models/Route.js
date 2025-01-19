const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  routeName: { type: String, maxlength: 128, required: true },
  lastUpdate: { type: Date, default: Date.now },
  stopIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stop' }],
  scheduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' },
});

module.exports = mongoose.model("Route", routeSchema, "Route");
