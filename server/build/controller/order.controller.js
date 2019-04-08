"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeOrder = exports.getOrder = void 0;

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

var getOrder = function getOrder(req, res, next) {
  var email = req.params.email;

  _index.Order.findAll({
    where: {
      email: email
    }
  }).then(function (orders) {
    if (orders.length === 0) next();
    var data = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = orders[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var order = _step.value;
        var issuedate = order.issuedate,
            expiredate = order.expiredate,
            confirmationnumber = order.confirmationnumber;
        data.push({
          issuedate: issuedate,
          expiredate: expiredate,
          confirmationnumber: confirmationnumber
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

    res.json(data);
  }).catch(function (e) {
    return next(e);
  });
};

exports.getOrder = getOrder;