import express from 'express'
import {User} from '../models/index'
import {register, login} from '../controller/index'

let user  = express.Router();
user.post('/login',login);
user.post('/register', register)

export {user}