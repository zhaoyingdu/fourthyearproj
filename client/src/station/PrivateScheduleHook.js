import React,{useState, useEffect,useContext} from 'react'
import {Spinner} from 'reactstrap'
import {UserContext} from '../Context'
import {getPrivateSchedule} from './apiCalls'

export let usePrivateHook = ()=>{
  let {rfid} = useContext(UserContext)
  let [schedule, setSchedule] = useState(null)
  let [status, setStatus] = useState(null)
  let processFetch = (rfid)=>{
    setStatus('fetching')
    getPrivateSchedule(rfid)
      .then(res=>{setStatus('fetching');setSchedule(res.data)})
      .catch(error=>setStatus('failed'))
  }
  let imm, timer  
  useEffect(()=>{
    if(rfid){
      imm =setImmediate(processFetch(rfid))
      timer = setInterval(()=>processFetch(rfid),10000)
    }
    return ()=>{
      if(imm)clearImmediate(imm)
      if(timer)clearInterval(timer)
    }
  },[])
  return {privateStatus: status, privateSchedue: schedule, rfid}
}

let StationPrivate = ()=>{
  let {status,schedule} = usePrivateHook()
  if(status === 'fetching') return <Spinner/>
  if(status === 'failed') return <p>failed</p>
  return Object.keys(schedule).map(
    (key, index)=>{
      return {[key]: `your run: ${schedule[key]}`}
  })
}
