import {Order} from '../models/index'
import moment from 'moment'

let makeOrder = (req,res,next)=>{
  let {email, date} = req.body
  let issuedate = moment()
  let expiredate = moment(date)
  let confirmationnumber = Math.random().toString(16).replace('0.','')
  Order.create({email, issuedate,expiredate,confirmationnumber})
  .then(()=>res.status(200).send(JSON.stringify(confirmationnumber)))
  .catch(err=>next(err))
}

export {makeOrder}