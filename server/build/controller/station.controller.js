"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPublicSchedule = exports.refreshTime = exports.refreshQueue = exports.getUserTime = exports.exitQueue = exports.joinQueue = exports.valJoin = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _objectSpread4 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _index = require("../models/index");

var _moment = _interopRequireDefault(require("moment"));

var _sequelize = require("sequelize");

var valJoin = function valJoin(req, res, next) {
  return _index.Station.findOne({
    where: {
      name: req.body.stationname
    }
  }).then(function (_ref) {
    var schedule = _ref.schedule,
        nextrun = _ref.nextrun;
    if (nextrun === schedule.length - 1) throw new Error('queue is full');
    next();
  });
};

exports.valJoin = valJoin;

var joinQueue = function joinQueue(req, res, next) {
  var _req$body = req.body,
      stationname = _req$body.stationname,
      rfid = _req$body.rfid;
  return _index.Station.findOne({
    where: (0, _defineProperty2.default)({
      name: stationname
    }, _sequelize.Op.not, {
      queue: (0, _defineProperty2.default)({}, _sequelize.Op.contains, [rfid])
    })
  }).then(function (station) {
    if (!station) throw new Error("station with ".concat(stationname, " not found, or user ").concat(rfid, " is already in queue"));
    station.queue.push(rfid);
    return station.save().then(function () {
      return res.status(200).send();
    });
  }).catch(function (e) {
    return next(e);
  });
};

exports.joinQueue = joinQueue;

var exitQueue = function exitQueue(req, res, next) {
  var _req$body2 = req.body,
      rfid = _req$body2.rfid,
      stationname = _req$body2.stationname;
  return _index.Station.findOne({
    where: {
      name: stationname,
      queue: (0, _defineProperty2.default)({}, _sequelize.Op.contains, [rfid])
    }
  }).then(function (station) {
    if (!station) throw new Error("station with ".concat(stationname, " not found, or user ").concat(rfid, " is not in queue"));
    station.queue = station.queue.filter(function (elem) {
      return elem !== rfid;
    });
    return station.save().then(function () {
      return res.status(200).send();
    });
  }).catch(function (e) {
    return next(e);
  });
};

exports.exitQueue = exitQueue;

var getUserTime = function getUserTime(req, res, next) {
  var userID = req.body.rfid;
  var report = {};
  return _index.Station.findAll().then(function (stations) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = stations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var station = _step.value;

        if (station.queue.includes(userRfid)) {
          var schedule = station.schedule,
              capacity = station.capacity,
              queue = station.queue;
          var userPostion = queue.findIndex(function (rfid) {
            return rfid === userID;
          }) + 1;
          var calTime = schedule[nextrun + Math.floor(userPostion / capacity)];
          report = (0, _objectSpread4.default)({}, report, (0, _defineProperty2.default)({}, station.name, calcTime)); //todo: convert to expected waitng time for this specific guy
        }
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

    return res.json(report);
  }).catch(function (e) {
    return next(e);
  });
};

exports.getUserTime = getUserTime;

var refreshQueue =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var stations, parkOpen, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, station, _nextrun;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return aupdateSchedule();

          case 2:
            stations = _context.sent;
            parkOpen = false;
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 7;

            for (_iterator2 = stations[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              station = _step2.value;
              _nextrun = stations.nextrun;
              if (_nextrun !== -1) parkOpen = true;
            }

            _context.next = 15;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](7);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t0;

          case 15:
            _context.prev = 15;
            _context.prev = 16;

            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }

          case 18:
            _context.prev = 18;

            if (!_didIteratorError2) {
              _context.next = 21;
              break;
            }

            throw _iteratorError2;

          case 21:
            return _context.finish(18);

          case 22:
            return _context.finish(15);

          case 23:
            if (!parkOpen) {
              _context.next = 25;
              break;
            }

            return _context.abrupt("return", setInterval(function () {
              updateSchedule();
            }, 30000));

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[7, 11, 15, 23], [16,, 18, 22]]);
  }));

  return function refreshQueue() {
    return _ref2.apply(this, arguments);
  };
}();

exports.refreshQueue = refreshQueue;

var refreshTime = function refreshTime() {
  return _index.Station.findAll().then(function (stations) {
    console.log(JSON.stringify(stations));
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      var _loop = function _loop() {
        var station = _step3.value;
        var name = station.name,
            queue = station.queue,
            capacity = station.capacity,
            schedule = station.schedule,
            nextrun = station.nextrun; //1. update the queue

        if ((0, _moment.default)(nextrun, 'HH:mm:ss').isSameOrBefore((0, _moment.default)())) {
          queue = queue.slice(capacity);
          nextrun = schedule.find(function (elem) {
            return (0, _moment.default)(nextrun, 'HH:mm:ss').isBefore((0, _moment.default)(elem, 'HH:mm:ss'));
          });
          station.update({
            queue: queue,
            nextrun: nextrun
          });
        }
      };

      for (var _iterator3 = stations[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  });
};

exports.refreshTime = refreshTime;

var getPublicSchedule = function getPublicSchedule(req, res, next) {
  _index.Station.findAll().then(function (stations) {
    var scheduleList = {};
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = stations[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var station = _step4.value;
        var name = station.name,
            capacity = station.capacity,
            queue = station.queue,
            schedule = station.schedule,
            _nextrun2 = station.nextrun;
        var expectedWait = schedule.length - 1 === _nextrun2 ? -1 : schedule[_nextrun2];
        console.log(JSON.stringify(scheduleList));
        scheduleList = (0, _objectSpread4.default)({}, scheduleList, (0, _defineProperty2.default)({}, name, expectedWait));
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    if (Object.entries(scheduleList).length === 0) throw new Error('schedule empty');
    return res.status(200).send(JSON.stringify(scheduleList));
  }).catch(function (e) {
    return next(e);
  });
};

exports.getPublicSchedule = getPublicSchedule;