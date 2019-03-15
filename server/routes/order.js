import express from 'express'
import {auth, makeOrder,getOrder} from '../controller/index'

let orderRoutes = express.Router()
orderRoutes.route('/')
  .post(auth, makeOrder)
orderRoutes.route('/:email')
  .get(getOrder)

export {orderRoutes as order}