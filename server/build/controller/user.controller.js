"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = exports.register = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _index = require("../models/index");

var register =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(req, res, next) {
    var _req$body, email, password, user;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context.next = 3;
            return _index.User.findOne({
              where: {
                email: email
              }
            }).catch(function (err) {
              return next(err);
            });

          case 3:
            user = _context.sent;
            user ? res.status(400).send() : _index.User.create({
              email: email,
              password: password
            }).then(function (instance) {
              return res.status(200).send();
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function register(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.register = register;

var login = function login(req, res, next) {
  _index.User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  }).then(function (user) {
    user ? res.data = {
      email: user.email,
      password: user.password
    } : res.status(401).send();
    next();
  }).catch(function (err) {
    return next(err);
  });
};

exports.login = login;