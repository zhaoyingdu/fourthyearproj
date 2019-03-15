import React,{useState, useEffect,useContext} from 'react'
import {Spinner} from 'reactstrap'
import {UserContext} from '../Context'
import {getPrivateSchedule} from '../apiCalls'

export let usePrivateHook = ()=>{
  let {rfid} = useContext(UserContext)
  let [schedule, setSchedule] = useState({})
  let [status, setStatus] = useState()
  let processFetch = (rfid)=>{
    setStatus('fetching')
    return getPrivateSchedule(rfid)
      .then(res=>{
        alert(JSON.stringify(res.data))
        setStatus('success')
        setSchedule(res.data)})
      .catch(error=>
        {
        alert('error'+error)
        setStatus('failed')
        })
  }
  let imm, timer  
  useEffect(()=>{
    if(rfid){
      imm =setImmediate(()=>processFetch(rfid))
      timer = setInterval(()=>processFetch(rfid),10000)
    }
    return ()=>{
      if(imm)clearImmediate(imm)
      if(timer)clearInterval(timer)
    }
  },[])
  return {privateStatus: status, privateSchedule: schedule, rfid}
}
