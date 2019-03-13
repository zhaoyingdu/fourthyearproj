"use strict";

var Station = require('./test.js').Station;

var updateSchedule = function updateSchedule() {
  return Station.findAll().then(function (stations) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = stations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var station = _step.value;
        var name = station.name,
            queue = station.queue,
            capacity = station.capacity,
            schedule = station.schedule,
            nextrun = station.nextrun;
        nextrun = schedule.findIndex(function (time) {
          return moment(time, 'HH:mm:ss').isAfter(moment());
        });
        station.update({
          nextrun: nextrun
        });
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  });
};

updateSchedule();