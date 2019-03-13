"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeOrder = void 0;

var _index = require("../models/index");

var _moment = _interopRequireDefault(require("moment"));

var makeOrder = function makeOrder(req, res, next) {
  var _req$body = req.body,
      email = _req$body.email,
      date = _req$body.date;
  var issuedate = (0, _moment.default)();
  var expiredate = (0, _moment.default)(date);
  var confirmationnumber = Math.random().toString(16).replace('0.', '');

  _index.Order.create({
    email: email,
    issuedate: issuedate,
    expiredate: expiredate,
    confirmationnumber: confirmationnumber
  }).then(function () {
    return res.status(200).send(JSON.stringify(confirmationnumber));
  }).catch(function (err) {
    return next(err);
  });
};

exports.makeOrder = makeOrder;