const moment  = require('moment')
const expect = require('expect')
let {toEqual} = expect

let createScheduleList = ({minTime='00:00:00', maxTime='23:59:59', step})=>{
  let min = moment(minTime, 'HH:mm:ss')//.format('hh:mm:ss')
  let max = moment(maxTime, 'HH:mm:ss').add(1,'m')//.format('hh:mm:ss')
  let arr = [] 
  while (min.isSameOrBefore(max)){
    arr.push(min.format('HH:mm:ss'))
    //str = str.concat(minTime.format('kk:mm:ss'),',')x
    min = min.add(step,'m')
  }
  //str.replace()
  //str = str.slice(0,str.length-1).concat('}')
  //console.log(str)
  return arr//str
}



exports.createScheduleList

let date = moment('2019-11-02', 'YYYY-MM-DD')
console.log(JSON.stringify(date))
console.log(JSON.stringify(moment()))
let time = moment('22:22:22', 'HH:mm:ss')
console.log(JSON.stringify(time))
console.log(moment().isBefore(time))
console.log(moment('2019-02-02').isBefore(moment()))

//console.log(moment('00:11:22','HH:mm:ss').isBefore('22:22:22','HH:mm:ss'))

/*

let str = createScheduleList({step : 30})
let timeArr = str.slice(1, str.length-1).split(',').map(e=>moment(e, 'kk:mm:ss'))
//console.log(moment().startOf("hour"))

//console.log(`now:\n ${now}`)
let next = timeArr.find(e=>e>moment('23:00:00','kk:mm:ss'))


 let nextTimeLot = ({timeList, queueLength, capacity, nextrun})=>{
  console.log(nextrun)
  console.log(timeList[1])
  console.log('nexrun: '+nextrun)
  nextrun = nextrun ||timeList[0]
  let nextRunIndex = timeList.findIndex(e=>e===nextrun)
  console.log('nextrun index: '+nextRunIndex)
  let nowIndex = timeList.findIndex(e=>e>moment())
  console.log('now index: '+nowIndex)
  let lastIndex = timeList.length-1
  console.log('last index: '+lastIndex)
  let slotsForQueue = Math.floor(queueLength/capacity)
  console.log('queue occupies '+slotsForQueue+' slots')
  if(nextRunIndex === lastIndex -1 && queueLength === capacity){
    //the last schedule slot has been fully filled
    return {nextrun, canjoin: false} 
  }

  if(nowIndex>nextRunIndex){
    if(nowIndex + slotsForQueue>lastIndex) return {nextrun, canjoin:false} //shift timer to now, but the queue is extending to the end
    return {nextrun:timeList[nowIndex+slotsForQueue], canjoin:true}
  }
  if(nextRunIndex+slotsForQueue >= lastIndex+1){
    return {nextrun, canjoin:false}
  }else{
    return {nextrun:timeList[nextRunIndex+slotsForQueue],canjoin:true}
  }
}


let test1 = ()=>nextTimeLot({
  timeList : timeArr,
  queueLength : 5,
  capacity: 5,
  nextrun: timeArr[timeArr.length-1]
})

expect(test1()).toEqual({nextrun:timeArr[timeArr.length-1], canjoin:false})


let test2 = ()=>nextTimeLot({
  timeList : timeArr,
  queueLength : 10,
  capacity: 5,
  nextrun: timeArr[0]
})

console.log(test2())
//expect(test1()).toEqual(timeArr[timeArr.length-1])
*/