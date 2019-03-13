
let logInstance = (instance)=>{
  let data = instance.dataValues
  Object.keys(data).forEach(
    key=>{
      console.log(key+': '+instance[key])
    }
  )
}


module.exports = (sequelize,DataTypes)=>{
  return sequelize.define('station', {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey:true
    },
    queue:{
      type:DataTypes.ARRAY(DataTypes.TEXT)  
    }, 
    capacity: {
      type: DataTypes.INTEGER,
      allowNUll: false,
    },
    schedule: {
      type: DataTypes.ARRAY(DataTypes.TIME),
      allowNUll:true
    },
    nextrun: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'stations',
    timestamps:false,
    /*hooks:{
      beforeUpdate: async (station, opions)=>{
        logInstance(station)
        let {name, queue, capacity, schedule, nextrun} = station
        //1. update the queue
        if(moment(nextrun,'HH:mm:ss').isSameOrBefore(moment())){
          queue = queue.slice(capacity)
          nextrun = schedule.find(elem=>{
            return moment(nextrun, 'HH:mm:ss').isBefore(moment(elem,'HH:mm:ss'))
          })
          station.queue = queue x
          station.nextrun = nextrun
        }

        //2. check if it is the last run
        if(nextrun === (schedule[schedule.length-1])){
          throw new Error(`${name} is at its last run`)
        }

        //3. check if queue is full
        //1 2 3 4 5
        //0 1 2 3 4
        let remainingLots = schedule.length - schedule.findIndex(e => e === nextrun)
        if(queueLength > capacity*remainingLots){
          throw new Error(`${name} queue is full`)
        }
       
        
        
        
     
      }
    }*/
})

}

