import React,{useEffect,useState} from 'react'
import {getPublicSchedule, joinQueue,quitQueue, getPrivateSchedule} from '../apiCalls'
import {usePrivateHook} from './PrivateScheduleHook'
import {Row,Col, Container} from 'reactstrap'


const stations = {
  tory:'Tory Building',
  mechanzie: 'Mechanzie Building',
  library: 'McO\'drum Library',
  university_center: 'University Center',
  minto:'Minto Case'
}



let StationPublic = ()=>{
  let [schedule, setSchedule] =useState({})
  let [status, setStatus] = useState(null)
  let {privateStatus, privateSchedule, rfid} = usePrivateHook()
  let processFetch = ()=>{
    setStatus('fetching')  
    getPublicSchedule().then(res=>{
      setStatus('success')
      setSchedule(res.data)
    }).catch((err)=>{
      setStatus('failed')
      setSchedule(null)
    })}
  useEffect(()=>{ 
    let imm = setImmediate(()=>processFetch())
    let timer = setInterval(()=>processFetch(),10000)
    return ()=>{
      clearImmediate(imm)
      clearInterval(timer)}
  }, [])

  let handleJoin = (station)=>{
    joinQueue({rfid, stationname:station})
  }
  let handleQuit =(station) =>{
    quitQueue({rfid,stationname:station})
  }

  if(status !=='success') return null
  return (
    <>
    <div className='d-flex flex-column align-items-center'>
      <div className='p-2 d-flex text-secondary'>
          <div style={{width:'10rem'}}>Stations</div>
          <div style={{width:'10rem'}}>next run</div>
          {privateStatus==='success'? <div style={{width:'10rem'}}>your run</div>: null}
      </div>
      {Object.keys(stations).map(key=>{
        return (
          <div className='p-1.5 d-flex' key ={key}>
            <div className = ''style={{width:'10rem'}}>{stations[key]}</div>
            <div style={{width:'10rem'}}>{schedule[key]?schedule[key]:''}</div>
            {privateStatus==='success'? 
              <div style={{width:'10rem'}}>{
                privateSchedule[key]
                  ?<>
                    {privateSchedule[key]}
                    <input type='image' src='minusSign.svg' onClick={(e)=>{e.preventDefault();handleQuit(key)}} />
                  </>
                  :<input type='image' src='plusSign.svg' onClick={(e)=>{e.preventDefault();handleJoin(key)}} />}
              </div> 
              : ''
            }
         </div>
        )
      })}
     </div>
     </>
  )
}
export {StationPublic}