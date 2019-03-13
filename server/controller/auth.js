import {User} from '../models/index'

let auth = (req,res,next)=>{
  User.findOne({
    where:{email: req.body.email,
    password:req.body.password}
  }).then(user=>{
    user
      ? next()
      : res.status(400).send()
  }).catch(err=>next(err))
}

export default auth
