import express from 'express'
import {getRfid, redeemRfid} from '../controller/index'
import sendRes from './util'
let rfid = express.Router()

rfid.route('/getId/:email')
  .get(getRfid, (req,res, next)=>{
      data = res.data
      return res.json(data)
    }
  )
rfid.route('/redeem')
  .post(redeemRfid)

export {rfid}