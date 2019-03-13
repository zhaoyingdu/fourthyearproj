"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.station = void 0;

var _express = _interopRequireDefault(require("express"));

var _station = require("../controller/station.controller");

var station = _express.default.Router();

exports.station = station;
station.route('/public').get(_station.getPublicSchedule);
station.route('/join').all(_station.valJoin).post(_station.joinQueue);
station.route('/quit').post(_station.exitQueue);
station.route('/private').get(_station.getUserTime);