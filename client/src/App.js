import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import Navigation from './Navigation'
import Ticket from './ticket/MainPanel'
import Station from './station/Station'
import Map from './map/Map'
import Dashboard from './dashBoard/DashBoard'
import {ContextProvider} from './Context'
import './App.css'


let App = ()=>{
  return( 
    <BrowserRouter>
    <ContextProvider>
      <Navigation />
      <Route path='/ticket' component={Ticket}/>
      <Route path='/station' component={Station} />
      <Route path='/map' component={Map} /> 
      <Route path='/dashboard' render = {Dashboard}/>
    </ContextProvider>
  </BrowserRouter>
)
}

export default App