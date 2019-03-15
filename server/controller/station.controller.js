import {Station, sequelize} from '../models/index'
import moment from 'moment'
import {Op} from 'sequelize'

export let valJoin= (req,res,next)=>{
  return Station.findOne({where:{name:req.body.stationname}})
    .then(({schedule, nextrun})=>{
      if(nextrun === schedule.length-1) throw new Error('queue is full')
      next()
    })
}


export let joinQueue = (req,res,next)=>{
  let {stationname, rfid} = req.body
  return Station.findOne({
    where:{
      name:stationname,
      [Op.not]:{
        queue:{
          [Op.contains]:[rfid]
        }
      }
    }
  }).then(station=>{
    if(!station) throw new Error(`station with ${stationname} not found, or user ${rfid} is already in queue`)
    station.queue.push(rfid)
    return station.update({queue:station.queue}).then(()=>res.status(200).send())
  }).catch(e=>next(e))
}


export let exitQueue = (req,res,next) =>{
  let {rfid, stationname} = req.body
  return Station.findOne({
    where:{
      name:stationname,
      queue:{
        [Op.contains]:[rfid]
      }
    }
  }).then(station=>{
    if(!station) throw new Error(`station with ${stationname} not found, or user ${rfid} is not in queue`)
    //station.queue = station.queue.filter(elem=>elem!==rfid)
    return station.update({queue: station.queue.filter(elem=>elem!==rfid)}).then(()=>res.status(200).send())
  }).catch(e=>next(e))
}



export let getStaionUserTime = (req,res,next)=>{
  Station.findOne({
    where:{
      name:stationname,
      queue:{
        [Op.contains]:[rfid]
      }
    }
  }).then(station=>{
    let {name} = station
    if(!station) throw new Error(`station with ${name} not found, or user ${rfid} is not in queue`)
    return res.json({[name]:calcUserRun(station)})
  }).catch(e=>next(e))
}

let calcUserRun = ({schedule, capacity, queue, nextrun})=>{
  return calcTime = schedule[nextrun+Math.floor(userPostion/capacity)]
}

let calcStationRun = ({schedule, nextrun})=>{
  return schedule.length-1 === nextrun
        ? -1
        : schedule[nextrun]
}

export let getUserTime = (req,res,next)=>{
  let {rfid:userID} = req.body
  let report = {}
  return Station.findAll().then(stations=>{
    for(let station of stations){
      if(station.queue.includes(userID)){
        report = {...report,[station.name]: calcUserRun(station)} //todo: convert to expected waitng time for this specific guy
      }
    }
    return res.json(report)
  }).catch(e=>next(e))
}


export let refreshQueue = async ()=>{
  let stations = await aupdateSchedule()
  let parkOpen = false
  for(let station of stations){
    let {nextrun} = stations
    if(nextrun !== -1) parkOpen =true 
  }
  if(parkOpen){
    return setInterval(()=>{
      updateSchedule()
    }, 30000)
  }
}


export let refreshTime = ()=>{
  return Station.findAll().then(stations=>{
    console.log(JSON.stringify(stations))
    for(let station of stations){
      let {name, queue, capacity, schedule, nextrun} = station
        //1. update the queue
        if(moment(nextrun,'HH:mm:ss').isSameOrBefore(moment())){
          queue = queue.slice(capacity)
          nextrun = schedule.find(elem=>{
            return moment(nextrun, 'HH:mm:ss').isBefore(moment(elem,'HH:mm:ss'))
          })
          station.update({queue, nextrun})
        }
    }
  })
}


export let getPublicSchedule = (req,res,next)=>{
  Station.findAll().then(stations=>{
    let scheduleList = {}  
    for(let station of stations){
      let {name} = station   
      scheduleList = {...scheduleList, [name]:calcStationRun(station)}
    }
    if(Object.entries(scheduleList).length === 0) throw new Error('schedule empty')
    return res.json(scheduleList)
  }).catch(e=>next(e))
} 

