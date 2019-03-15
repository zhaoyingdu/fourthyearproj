import axios from 'axios'
let apiAxios = axios.create({baseURL:'/api'})
apiAxios.defaults.headers.post['Content-Type'] = 'application/json'


// api/order
let buyTicket = ({email, password, date})=>{
  return apiAxios.post('/order',{email,password,date})
}

let getAllOrders = ({email})=>{
  return apiAxios.get(`/order/${email}`)
}
/**
 * [
 *  {issuedate: **, expiredate: **, confirmationnumber: **}
 * ]
 */


// api/station

let getPublicSchedule = ()=>{
  return apiAxios.get('/station/public')
}

let getPrivateSchedule = (rfid)=>{
  return apiAxios.post('/station/private', {rfid})
}

export let joinQueue = ({stationname, rfid})=>{
  return apiAxios.post('/station/join',{stationname,rfid})
}
export let quitQueue = ({stationname, rfid})=>{
  return apiAxios.post('/station/quit',{stationname,rfid})
}


// api/user
let login = ({email, password})=>{
  return apiAxios.post('/user/login', {email,password})
}

let register = ({email, password})=>{
  return apiAxios.post('/user/register', {email,password})
}

export {getPublicSchedule, getPrivateSchedule, buyTicket, login, register, getAllOrders}