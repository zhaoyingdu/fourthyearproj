"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _index = require("./routes/index");

var app = (0, _express.default)();
app.use(_express.default.static(_path.default.join(__dirname, '../client/build')));
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use('/api/user', _index.user);
app.use('/api/order', _index.order);
app.use('/api/station', _index.station);
app.use('/api/rfid', _index.rfid);
app.use(function (err, req, res, next) {
  //console.error(err.stack)
  res.status(500).send('Something broke!' + err);
});
var _default = app;
exports.default = _default;