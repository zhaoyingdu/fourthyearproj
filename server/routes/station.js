import express from 'express'
import {getPublicSchedule, joinQueue, exitQueue, valJoin, getUserTime} from '../controller/station.controller'
let station = express.Router()
station.route('/public')
  .get(getPublicSchedule)
station.route('/join')
  .all(valJoin)
  .post(joinQueue)
station.route('/quit')
  .post(exitQueue)
station.route('/private')
  .post(getUserTime)






export {station}
