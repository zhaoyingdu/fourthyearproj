"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.order = void 0;

var _express = _interopRequireDefault(require("express"));

var _index = require("../controller/index");

var orderRoutes = _express.default.Router();

exports.order = orderRoutes;
orderRoutes.route('/').all(_index.auth).post(_index.makeOrder).get();