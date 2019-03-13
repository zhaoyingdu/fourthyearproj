"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rfid = void 0;

var _express = _interopRequireDefault(require("express"));

var _rfid = require("../controller/rfid.controller");

var rfid = _express.default.Router();

exports.rfid = rfid;
rfid.route('/getId/:email').get(_rfid.getRfid);
rfid.route('/redeem').post(_rfid.redeemRfid);