import React,{useEffect, useRef, useState} from 'react'
import {Container, Row, Col} from 'reactstrap' 
import mapStyle from './style'
/* todo:
 * [] add restriction
 * [] add clickable event on currently supported buildings
 * [] add data synchronization from db
 */
//AIzaSyAWRm03N61PS4lNrnr2XQbTNqFcw-C1PX4





let InfoBox = ({info})=>{ 
  let data
  switch(info){
    case 'university center':
      data = `enjoy your stay in this full featured center, grab some food and coffee, or have a lovely meal in our graduate student runned restaurant`
      break;
    case 'tory':
      data = `well, you can see an amzing wall art here, build with tiny moziac blocks!`
      break;
    case 'minto':
      data = `stop by and listen to the piano played by passengers!`
      break;
    case 'library':
      data = `'One of the most democratic place is library' find this quote here if you can!`
      break;
    case 'mechanzie':
      data = `if you go through the hallways on the fisrt floor, you can smell the smell of gasoline! because aerospace engineers works here!`
      break;
    default:
      data = 'hover over the blue shades to view our places!'
  }
  return <div style={{width:'30rem'}}>
    <p className = 'text-center'>{info}</p>
    <p>{data}</p>
    </div>
}


let Map = ()=>{
  let {Map, Marker, InfoWindow} = window.google.maps
  let navigator = window.navigator
  let mapRef = useRef(null)
  let [info,setInfo] = useState(null)

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
      map.data.loadGeoJson('map.json')
      map.data.setStyle({
        fillColor: 'blue',
        strokeWeight: 1
      });
      map.data.addListener('mouseover', function(e) {
        setInfo(e.feature.getProperty('name'))
      });

      
      let marker = new Marker({position:pos,map})
      let infoWindow = new InfoWindow

      
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
  ,[])

  return (
    <Container>
      <Row className='align-items-center'>
        <Col xs='auto'><div ref = {mapRef} style={{height: '500px', width:'500px'}}></div></Col>
        <Col ><InfoBox info={info} /></Col>
      </Row>
    </Container>
  )
  
}

export default Map