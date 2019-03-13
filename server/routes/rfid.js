import express from 'express'
import {getRfid, redeemRfid} from '../controller/rfid.controller'
let rfid = express.Router()

rfid.route('/getId/:email')
  .get(getRfid)
rfid.route('/redeem')
  .post(redeemRfid)

export {rfid}