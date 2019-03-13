import React,{useState, useEffect} from 'react'
import PublicContent from './PublicContent'
import {connect} from 'react-redux'

let Schedule =({activeComponent})=>{
  let [visible, setVisible] = useState(false)
  useEffect(()=>{
  
    if(activeComponent.find(elem=>elem==='schedule')==='schedule'){
      setVisible(true)
    }else{
      setVisible(false)
    }
  })
  return (
      visible?<PublicContent />:null
  )
}


let ScheduleHome = connect(
  (state)=>{
    return{
      activeComponent: state.history.activeComponent
    }
  })(Schedule)

export default ScheduleHome