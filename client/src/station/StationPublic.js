import React,{useEffect,useState} from 'react'
import {getPublicSchedule} from './apiCalls'
import {usePrivateHook} from './PrivateScheduleHook'
import {Spinner, ListGroup, ListGroupItem} from 'reactstrap'


let StationPublic = ()=>{
  let [schedule, setSchedule] =useState({})
  let [status, setStatus] = useState(null)
  let {privateStatus, privateSchedule, rfid} = usePrivateHook()
  let processFetch = ()=>{
    setStatus('fetching')  
    getPublicSchedule().then(res=>{
      setStatus('success')
      setSchedule(res.data)
      console.log(schedule)
    }).catch((err)=>{
      setStatus('failed')
      setSchedule(null)
    })}
  useEffect(()=>{ 
    setImmediate(processFetch())
    let timer = setInterval(()=>processFetch(),10000)
    return ()=>{clearInterval(timer)}
  }, [])

  let joinQueue = ()=>{
    alert('you wish to join, huh')
  }
  let quitQueue =() =>{
    alert('you wish to quit?')
  }

  if(status !=='success') return <p>fetch failure</p>
  if(rfid){
    let privateKeys = Object.keys(privateSchedule||{})
    return(
    <>
      <ListGroup>
        {Object.keys(schedule).map((key)=>{
          let hasUser = privateKeys.includes(key)
            return(
              <ListGroupItem color={hasUser?'danger':'warning'} key={key} onClick={hasUser?()=>quitQueue(rfid):()=>joinQueue(rfid)}>
                {key} next run at: {schedule[key]}
                {hasUser? `your run starts at: ${privateSchedule[key]}`:null}
              </ListGroupItem>
            )
          })
        }
      </ListGroup>
    </>
  )}

  return(
    <>
    <ListGroup>
      {Object.keys(schedule).map((key)=>{
          return(<ListGroupItem color={'warning'} key={key}>
            {key} next run at: {schedule[key]}
          </ListGroupItem>)
        })
      }
    </ListGroup>
    </>
  )
}
export {StationPublic}