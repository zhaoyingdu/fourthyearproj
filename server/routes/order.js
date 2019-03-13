import express from 'express'
import {auth, makeOrder} from '../controller/index'

let orderRoutes = express.Router()
orderRoutes.route('/')
  .all(auth)
  .post(makeOrder)
  .get()

export {orderRoutes as order}