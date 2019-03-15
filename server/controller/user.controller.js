import {User} from '../models/index'


let register = async (req,res,next)=>{
  let {email,password} = req.body
  let user = await User.findOne({where:{email}})
    .catch(err=>next(err))
  user
    ? res.status(400).send()
    : User.create({email,password}).then(instance=>res.status(200).send())
}


let login = (req, res,next)=>{
  User.findOne({
    where:{email: req.body.email,
    password:req.body.password}
  }).then(user=>{
    user
      ? res.data={email:user.email, password:user.password}
      : res.status(401).send()
      
    next()
  }).catch(err=>next(err))
}



export {register, login}