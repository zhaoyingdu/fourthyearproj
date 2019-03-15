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

/*
let PrivateSchedule = ()=>{
  
    let [status, setStatus] = useState(null)
    
    let join = (station)=>{
      if(status === 'fetching') return
      setStatus('fetching')
      joinQueue({rfid, stationname:station})
        .
    }

    return (
      key
        ?<input type='image' src='minusSign.svg' onClick={(e)=>{e.preventDefault();join(key)}} />
        :<input type='image' src='plusSign.svg' onClick={(e)=>{e.preventDefault();quit(key)}} />
    )

}*/