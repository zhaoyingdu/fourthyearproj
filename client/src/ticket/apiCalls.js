import axios from 'axios'
let ticketAxios = axios.create({baseURL:'/api'})
ticketAxios.defaults.headers.post['Content-Type'] = 'application/json'

let buyTicket = ({email, password, date})=>{
  return ticketAxios.post('/order',{email,password,date})
}

export {buyTicket}