"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRfid = exports.redeemRfid = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _index = require("../models/index");

var _sequelize = require("sequelize");

var _moment = _interopRequireDefault(require("moment"));

var createRfidTransaction =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(row, email) {
    var newRfid, rfidRow, saved;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            newRfid = Math.random().toString(16).replace('0.', '').toUpperCase();
            _context.next = 3;
            return _index.Rfid.create({
              rfid: newRfid,
              email: email
            }).catch(function (e) {
              throw new Error('create new rfid column failed' + e);
            });

          case 3:
            rfidRow = _context.sent;
            _context.next = 6;
            return row.update({
              used: true
            }).catch(function (e) {
              rfidRow.destroy();
              throw new Error("save used:true failed: ".concat(e));
            });

          case 6:
            saved = _context.sent;
            return _context.abrupt("return", rfidRow.rfid);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createRfidTransaction(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var redeemRfid = function redeemRfid(req, res, next) {
  var _req$body = req.body,
      confirmationnumber = _req$body.confirmationnumber,
      email = _req$body.email;
  return _index.Order.findOne({
    where: {
      confirmationnumber: confirmationnumber,
      used: (0, _defineProperty2.default)({}, _sequelize.Op.not, true)
    }
  }).then(function (row) {
    if (!row) throw new Error('confirmation number not found');
    if (!(0, _moment.default)(row.expireDate).isSame((0, _moment.default)())) throw new Error('date not match');
    return createRfidTransaction(row, email);
  }).then(function (rfid) {
    return res.json(rfid);
  }).catch(function (err) {
    return next(err);
  });
};

exports.redeemRfid = redeemRfid;

var getRfid = function getRfid(req, res, next) {
  var email = req.body.email;
  return _index.Rfid.findOne({
    email: email
  }).then(function (rfid) {
    if (!rfid) return res.status(400).send('email doesn\'t have rfid associated');
    res.data = (0, _objectSpread2.default)({}, res.data, {
      rfid: rfid.rfid //todo: should be res.data?

    });
    next();
  }).catch(function (err) {
    return next(err);
  });
};

exports.getRfid = getRfid;