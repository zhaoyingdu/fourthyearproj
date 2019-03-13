import React,{useEffect, useRef} from 'react'
import mapStyle from './style'
/* todo:
 * [] add restriction
 * [] add clickable event on currently supported buildings
 * [] add data synchronization from db
 */
//AIzaSyAWRm03N61PS4lNrnr2XQbTNqFcw-C1PX4

let Map = ()=>{
  let {Map, Marker, InfoWindow} = window.google.maps
  let navigator = window.navigator
  let mapRef = useRef(null)
  useEffect(
    ()=>{
      let pos = {lat:45.3857,lng:-75.6970}
      let map = new Map(
        mapRef.current,
          {
            zoom:15, 
            minZoom:14,
            center:pos,
            restriction:{
              latLngBounds:{north:45.3940, south:45.3774, east:-75.6887, west:-75.7053},
              strictBounds:false
            },
            styles: mapStyle
          }
      )

      
      let marker = new Marker({position:pos,map})
      let infoWindow = new InfoWindow

      map.addListener('mousemove',(e)=>{
        let zoom = map.zoom
        infoWindow.setContent(`pos: ${JSON.stringify(e.latLng.toJSON())}, zoom:${zoom}, center: ${JSON.stringify(map.getCenter().toJSON())}`)
      })
      let positionWatcher = navigator.geolocation ?
        navigator.geolocation.getCurrentPosition(
          (position)=>{
            pos.lat = position.coords.latitude
            pos.lng = position.coords.longitude

            infoWindow.setPosition(pos)
            infoWindow.setContent('Location found')
            map.setCenter(pos)
          },
          (err)=>{
            infoWindow.setContent('Geo services failed')   
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 3000
          }
        ) : (()=>{
          infoWindow.setContent('No Geo Service')
          return null
        })()
        
        infoWindow.setPosition(pos)
        infoWindow.open(map)
    return ()=>{
      navigator.geolocation.clearWatch(positionWatcher)
    }
    }
  )

  return (
    <div ref = {mapRef} style={{height: '500px', width:'500px'}}></div>
  )
  
}

export default Map