import React from 'react'
import Orders from './Orders'
import {Route} from 'react-router-dom'




let DashBoard = ()=>{
  return(
    <div className="d-flex justify-content-center">
      <Route path='/dashboard/orders' component={Orders}/>
      <Route path='/dashboard/parking' render={()=>{return <p>coming soon</p>}} />
      <Route path='/dashboard/activities' render={()=><p>coming soon</p>} />
    </div>
  )
}


export default DashBoard