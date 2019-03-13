import Sequelize from 'sequelize'
import moment from 'moment'
require('dotenv').config()

const sequelize = new Sequelize(`${process.env.DB}`, `${process.env.DB_USER}`, `${process.env.DB_PASS}`, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
/*sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
*/
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