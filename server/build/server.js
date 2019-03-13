"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _index = require("./models/index");

require("@babel/polyfill");

var _app = _interopRequireDefault(require("./app"));

var server = require('http').Server(_app.default);

var port = process.env.PORT || 5000;
var updater;

_index.sequelize.sync({
  force: false
}).then(function () {
  /**
   * Listen on provided port, on all network interfaces.
   */
  updater = (0, _index.updateSchedule)();
  server.listen(port, function () {
    return console.log("Listening on port ".concat(port));
  });
});