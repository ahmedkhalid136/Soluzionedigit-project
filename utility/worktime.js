const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const days = ['monday', 'thursday', 'wednesday', 'tuesday', 'friday', 'saturday', 'sunday'];

WorktimeType = function WorktimeType(key, options) {
  mongoose.SchemaType.call(this, key, options, 'WorktimeType');
};
WorktimeType.prototype = Object.create(mongoose.SchemaType.prototype);

WorktimeType.prototype.cast = function (val) {
  const _val = {};
  for (let i = 0; i < days.length; i++) {
    _val[days[i]] = castDay(val[days[i]]);
    validateDay(_val[days[i]]);
  }
  return _val;
};

exports.WorktimeType = mongoose.Schema.Types.WorktimeType = WorktimeType;

let castDay = function (day) {
  return {
    total: day.total,
    unavailability: day.unavailability,
    to: day.to,
    from: day.from,
    closed: day.closed,
    total: day.total,
  };
};

let validateDay = function (day) {
  if (day.unavailability == null) Date.unavailability = [];
  day.unavailability = Array.isArray(day.unavailability) ? day.unavailability : Array(day.unavailability);
  if (!(day.total != undefined && day.to != undefined && day.from != undefined)) throw new Error('Day required');
};
