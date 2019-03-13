const Sequelize = require( 'sequelize')
const Op = Sequelize.Op
const moment = require('moment')
const sequelize = new Sequelize('postgres', 'postgres', 'zhaoyingdu', {
  host: 'localhost',
  port: 5109,
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});


const Station = sequelize.import(__dirname+'/station.js')

sequelize.sync({force:false})
let getRandomInt = (max)=>{
  return Math.floor(Math.random() * Math.floor(max));
}
let updateSchedule = ()=>{
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
}


let find =()=>{
  return Station.findOne({where:{
      name:'library',
      
      [Op.not]:{queue:{
          [Op.contains]:['sadsadsa']
        }}
      
  }}).then(rs=>console.log(JSON.stringify(rs)))
}

find()