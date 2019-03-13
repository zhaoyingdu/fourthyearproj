import axios from 'axios'

let stationAxios = axios.create({baseURL:'/api'})
stationAxios.defaults.headers.post['Content-Type'] = 'application/json'

let getPublicSchedule = ()=>{
  return stationAxios.get('/station/public')
}

let getPrivateSchedule = (rfid)=>{
  return stationAxios.get('/station/private', {rfid})
}

let joinQueue = ({stationname, rfid})=>{
  stationAxios.post('/rfi')
}


export {getPublicSchedule, getPrivateSchedule}