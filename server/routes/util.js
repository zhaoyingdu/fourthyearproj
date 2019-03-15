export let sendRes = (req,res, next)=>{
  data = res.data
  return res.json(data)
}