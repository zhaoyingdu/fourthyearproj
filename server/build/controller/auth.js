"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("../models/index");

var auth = function auth(req, res, next) {
  _index.User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  }).then(function (user) {
    user ? next() : res.status(400).send();
  }).catch(function (err) {
    return next(err);
  });
};

var _default = auth;
exports.default = _default;