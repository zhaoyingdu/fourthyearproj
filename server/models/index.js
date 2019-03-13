import Sequelize from 'sequelize'
import moment from 'moment'


let DBUrl = process.env.DATABASE_URL || 'postgres://keagkkggmmoavr:f38e1827c7af3d957a09107c502f153fc1b05a1c2b114fda79dfde89df2eeca7@ec2-54-221-243-211.compute-1.amazonaws.com:5432/dcj4ab59j20pab'
const sequelize = new Sequelize(DBUrl);

const User = sequelize.import(__dirname + "/user.js")
const Order = sequelize.import(__dirname + "/order.js")
const Rfid = sequelize.import(__dirname + "/rfid.js")
const Station = sequelize.import(__dirname+'/station.js')


let updateSchedule = ()=>{
  let getRandomInt = (max)=>{
    return Math.floor(Math.random() * Math.floor(max));
  }
  return setInterval(()=>{
    return Station.findAll().then(stations=>{
      for(let station of stations){
        let {name, queue, capacity, schedule, nextrun} = station
        nextrun = schedule.findIndex(time=>{
          return moment(time,'HH:mm:ss').isAfter(moment())
        })
        let randLength = getRandomInt(1000)
        console.log(`div${Math.floor(randLength/capacity)}`)
        nextrun += Math.floor(randLength/capacity)
        station.update({nextrun})
      }
    })
  },10000)
}

export {sequelize, User,Order,Rfid,Station, updateSchedule}