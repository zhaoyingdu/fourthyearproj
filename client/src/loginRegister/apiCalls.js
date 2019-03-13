import axios from 'axios'

let credentialAxios = axios.create({baseURL:'/api'})
credentialAxios.defaults.headers.post['Content-Type'] = 'application/json'

let login = ({email, password})=>{
  return credentialAxios.post('/user/login', {email,password})
}

let register = ({email, password})=>{
  return credentialAxios.post('/user/register', {email,password})
}

export {login, register}