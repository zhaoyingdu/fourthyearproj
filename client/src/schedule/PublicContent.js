import React,{useEffect,useState} from 'react'
import {connect} from 'react-redux'
import {ITEMNAMES} from './constant'
import publicContentWorker from './publicContentWorker'
import privateContentWorker from './privateContentWorker'
import {Spinner} from 'reactstrap'

import add from './plusSign.svg'
import remove from './minusSign.svg'

const PublicItem = ({itemKey, estimate, user, rfid, joinQueue, exitQueue})=>{
  let [spin, setSpin] = useState(false)
  let {status, item, time} = user

  useEffect(()=>{
    if(status !== 'fetching')setSpin(false)
  },[status])

  rfid = true
  return(
    <div>
      {itemKey} : expected wait time {estimate} 
      {!rfid
        ? null
        : status === 'fetching' && spin 
          ? <Spinner color='secondary' />
          : itemKey === item
            ? <> {time} mins <img src={remove} alt='exit queue' onClick={()=>{exitQueue();setSpin(true)}} /></>
            : <img src={add} alt='join queue' onClick={()=>{joinQueue(itemKey);setSpin(true)}} />
      }  
    </div>
  )
}
let mapState = (state, ownProps)=>{
  return {
    estimate: state.schedule.items[ownProps.itemKey],
    user: state.schedule.user,
    rfid: state.login.rfid
  }
}
let mapDispatch=(dispatch,ownProps)=>{
  let item = ownProps.itemKey
  return {clickHandler: ()=>dispatch({type:'USER_ITEM_REQUEST', item})}
}
const ConnectedItem = connect(mapState,mapDispatch)(PublicItem)

//, 
let ItemLlist = ({refreshPublic, refreshPrivate, joinQueueRequest,exitQueueRequest,token, rfid})=>{
  let publicWorker,privateWorker
  useEffect(()=>{
    publicWorker = publicContentWorker()
    publicWorker.addEventListener('message',({data})=>refreshPublic(data))
    publicWorker.postMessage('spawn')
    return ()=>{
      publicWorker.postMessage('terminate')
      publicWorker.terminate()
    }
  },[])
  useEffect(()=>{
    token = true
    if(!token) return
    privateWorker = privateContentWorker()
    privateWorker.addEventListener('message',({data})=>{
      if(data.error){
        console.log('private data Error: '+data.error)
      }else{
        refreshPrivate(data)
      }
    },[rfid])
    privateWorker.postMessage({type:'spawn', payload:{token}})
    return ()=>{
      privateWorker.postMessage({type:'terminate'})
      privateWorker.terminate()
    }
  },[])

  let handleJoin = (item)=>{
    joinQueueRequest()
    privateWorker.postMessage({type:'changeItem',payload:{item, rfid}})
  }
  let handleQuit = ()=>{
    exitQueueRequest()
    privateWorker.postMessage({type:'cancel',payload:{rfid}})
  }
  return(
    <>
      {ITEMNAMES.map(name=>{
        return <ConnectedItem itemKey={name} hasRFID={true} joinQueue={(item)=>handleJoin(item)} exitQueue={handleQuit}/>
      })}
    </>
  )
}

let ConnectedItemList = connect(
    (state)=>{return {token:state.login.token, rfid: state.login.rfid}},
    (dispatch)=>{
      return {
        refreshPublic: (kvp)=>dispatch({type:'UPDATE_ITEMS_SUCCESS', items:kvp}),
        refreshPrivate: ({item, time})=>dispatch({type:'USER_ITEM_SUCCESS',item,time}),
        joinQueueRequest: (itemKey)=>dispatch({type:'USER_ITEM_REQUEST', item:itemKey}),
        exitQueueRequest: ()=>dispatch({type:'USER_ITEM_REQUEST', item:''})
      }
    })(ItemLlist)

const PublicContent = ()=>{ 
  return(
    <div>
      <ConnectedItemList />
    </div>
  )
}

export default PublicContent