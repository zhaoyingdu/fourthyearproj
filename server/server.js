import {sequelize, updateSchedule} from './models/index'
import app from './app'
require('dotenv').config({debug:process.env.DEBUG, path:'../.env'})

const server = require('http').Server(app)
const port = process.env.PORT ||5000;

let updater
sequelize.sync({force:false}).then(function() {

  updater = updateSchedule()
  server.listen(port, () => console.log(`Listening on port ${port}`));

});

