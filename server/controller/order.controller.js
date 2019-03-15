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


export let getOrder = (req,res,next)=>{
  let {email} = req.params
  Order.findAll({where: {email}})
    .then(orders=>{
      if(orders.length === 0) next()
      let data = []
      for(let order of orders){
        let {issuedate, expiredate, confirmationnumber} = order
        data.push({issuedate, expiredate, confirmationnumber})
      }
      res.json(data)
    })
    .catch(e=>next(e))
}

export {makeOrder}