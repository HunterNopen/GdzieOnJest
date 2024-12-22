const timetableModel = require("../models/timetableModel");
const { formatResponse } = require("../views/responseView.js");

const searchBuses = (req, res) => {
  const { from, to, time, day } = req.query;

  if (!from || !to || !time || !day) {
    return res.status(400).json({
      error: "Missing 'from', 'to', 'time', or 'day' query parameters.",
    });
  }

  const results = timetableModel.findNextBuses(from, to, time, day);

  res.json(formatResponse(results));
};

module.exports = { searchBuses };
