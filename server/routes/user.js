import express from 'express'
import {register, login} from '../controller/index'
import {getRfid, getOrder} from '../controller/index'


let user  = express.Router();
user.post('/login',login, getRfid, (req,res)=>res.json(res.data));
user.post('/register', register)

export {user}