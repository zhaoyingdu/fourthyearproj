const moment = require('moment')
const create = require('./generatedate').createScheduleList
create({minTime:'03:00:00', maxTime:'23:59:50', step:2})