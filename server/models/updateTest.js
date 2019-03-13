const Station = require('./test.js').Station

let updateSchedule = ()=>{
  return Station.findAll().then(stations=>{
    for(let station of stations){
      let {name, queue, capacity, schedule, nextrun} = station
      nextrun = schedule.findIndex(time=>{
        return moment(time,'HH:mm:ss').isAfter(moment())
      })
      station.update({nextrun})
    }
  })
}
 
updateSchedule()