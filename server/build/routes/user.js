"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.user = void 0;

var _express = _interopRequireDefault(require("express"));

var _index = require("../models/index");

var _index2 = require("../controller/index");

var user = _express.default.Router();

exports.user = user;
user.post('/login', _index2.login);
user.post('/register', _index2.register);