const timetableData = require("../data/schedule.json");
const { timeToMinutes } = require("../utils/timeUtils");

const findNextBuses = (from, to, time, day) => {
  const routes = timetableData.routes || [timetableData.timetable];
  const currentTimeInMinutes = timeToMinutes(time);

  if (!["weekdays", "saturdays", "sundays"].includes(day)) {
    return {
      error: `Invalid day '${day}'. Must be 'weekdays', 'saturdays', or 'sundays'.`,
    };
  }

  let results = [];

  for (const route of routes) {
    const { route: bus_number, columns } = route;

    const fromIndex = columns.findIndex((stop) => stop.stop_name === from);
    const toIndex = columns.findIndex((stop) => stop.stop_name === to);

    if (fromIndex === -1 || toIndex === -1 || toIndex <= fromIndex) continue;

    const stopTimes = columns[fromIndex]?.times[day];
    if (!stopTimes) continue;

    const filteredTimes = stopTimes.filter(
      (busTime) => timeToMinutes(busTime) > currentTimeInMinutes
    );

    if (filteredTimes.length > 0) {
      results.push({
        bus_number,
        from,
        to,
        next_buses: filteredTimes.slice(0, 3),
      });
    }
  }

  if (results.length === 0) {
    return {
      message: `No buses available after ${time} from '${from}' to '${to}' on ${day}.`,
    };
  }

  return results;
};

module.exports = { findNextBuses };
