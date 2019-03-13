"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "register", {
  enumerable: true,
  get: function get() {
    return _user.register;
  }
});
Object.defineProperty(exports, "login", {
  enumerable: true,
  get: function get() {
    return _user.login;
  }
});
Object.defineProperty(exports, "auth", {
  enumerable: true,
  get: function get() {
    return _auth.default;
  }
});
Object.defineProperty(exports, "makeOrder", {
  enumerable: true,
  get: function get() {
    return _order.makeOrder;
  }
});

var _user = require("./user.controller");

var _auth = _interopRequireDefault(require("./auth"));

var _order = require("./order.controller");