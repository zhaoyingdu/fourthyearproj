"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSchedule = exports.Station = exports.Rfid = exports.Order = exports.User = exports.sequelize = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _moment = _interopRequireDefault(require("moment"));

var _path = _interopRequireDefault(require("path"));

require('dotenv').config({
  path: _path.default.join(__dirname, '../.env')
});

var DBUrl = process.env.DATABASE_URL || process.env.DB_DEV_URL;
var sequelize = new _sequelize.default("".concat(DBUrl));
exports.sequelize = sequelize;
var User = sequelize.import(__dirname + "/user.js");
exports.User = User;
var Order = sequelize.import(__dirname + "/order.js");
exports.Order = Order;
var Rfid = sequelize.import(__dirname + "/rfid.js");
exports.Rfid = Rfid;
var Station = sequelize.import(__dirname + '/station.js');
exports.Station = Station;

var updateSchedule = function updateSchedule() {
  var getRandomInt = function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  };

  return setInterval(function () {
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
            return (0, _moment.default)(time, 'HH:mm:ss').isAfter((0, _moment.default)());
          });
          var randLength = getRandomInt(1000);
          console.log("div".concat(Math.floor(randLength / capacity)));
          nextrun += Math.floor(randLength / capacity);
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
  }, 10000);
};

exports.updateSchedule = updateSchedule;