import {Order, Rfid} from '../models/index'
import {Op} from 'sequelize'
import moment from 'moment'


let createRfidTransaction = async (row, email)=>{
  let newRfid= Math.random().toString(16).replace('0.','').toUpperCase()
  let rfidRow = await Rfid.create({rfid:newRfid, email}).catch(e=>{throw new Error('create new rfid column failed'+e)})
  let saved = await row.update({used:true}).catch(e=>{
    rfidRow.destroy()
    throw new Error(`save used:true failed: ${e}`)
  })
  return rfidRow.rfid
}

export let redeemRfid = (req,res,next)=>{
  let {confirmationnumber, email} = req.body
  return Order.findOne({
    where: {
      confirmationnumber,
      used: {
        [Op.not]: true 
      }
    }})
    .then(row=>{
      if(!row) throw new Error('confirmation number not found')
      if(!moment(row.expireDate).isSame(moment())) throw new Error('date not match')
      return createRfidTransaction(row, email)
    }).then(rfid => res.json(rfid))
    .catch(err=>next(err))   
}

export let getRfid = (req,res,next)=>{
  let {email} = req.params
  return Rfid.findOne({email})
    .then(rfid=>{
      if(!rfid) return res.status(400).send('email doesn\'t have rfid associated')
      return res.json({rfid: rfid.rfid})
    }).catch(err=>next(err))
}