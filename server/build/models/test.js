"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var Sequelize = require('sequelize');

var Op = Sequelize.Op;

var moment = require('moment');

var sequelize = new Sequelize('postgres', 'postgres', 'zhaoyingdu', {
  host: 'localhost',
  port: 5109,
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
var Station = sequelize.import(__dirname + '/station.js');
sequelize.sync({
  force: false
});

var getRandomInt = function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

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
};

var find = function find() {
  return Station.findOne({
    where: (0, _defineProperty2.default)({
      name: 'library'
    }, Op.not, {
      queue: (0, _defineProperty2.default)({}, Op.contains, ['sadsadsa'])
    })
  }).then(function (rs) {
    return console.log(JSON.stringify(rs));
  });
};

find();