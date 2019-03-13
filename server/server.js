import {sequelize, updateSchedule} from './models/index'
import app from './app'
const server = require('http').Server(app)
const port = process.env.PORT || 5000;

let updater
sequelize.sync({force:false}).then(function() {
  /**
   * Listen on provided port, on all network interfaces.
   */
  updater = updateSchedule()
  server.listen(port, () => console.log(`Listening on port ${port}`));

});


