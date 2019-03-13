/**
 * a simple worker used to update a mock schedule data
 * regularly, and send updated date to the app for the redux store to 
 * update accordingly
 * todo: change to a cors fetch to the actual data stored in the
 * server...
 * ps: 4th year project is great, yes, its great
 */

let wrapper = ()=>{
  let dummyDataAPI = {
    queue:[
      {rfid:'dummy',
        item:'item1',
        get time(){return Math.floor(Math.random() * Math.floor(20))}
      }      
    ],
    getItem(rfid){
      return new Promise((res,rej)=>{
        setTimeout(()=>{
          for(let entry of this.queue){
            if(entry.rfid === rfid){
              entry.item.length !== 0 
                ?res({item:entry.item, time: entry.time})
                :rej(new Error({error:'user has not register'}))
            }
          }
        }, 3000)
      })
    },
    changeItem(rfid, item){
      return new Promise((res,rej)=>{
        setTimeout(()=>{
          for(let entry of this.queue){
            if(entry.rfid === rfid){
              entry.item = item
              res({item:entry.item, time: entry.time})
            }
          }
        }, 3000)
      })
    },
    removeItem(rfid){
      return new Promise((res,rej)=>{
        setTimeout(()=>{
          for(let entry of this.queue){
            if(entry.rfid === rfid){
              entry.item = ''
              res()
            }
          }
        }, 3000)
      })
    },
  }
  let auth = (token)=>{//for now, always true, ignoring cases where user does not have rfid
    return new Promise((res,rej)=>{setTimeout(()=>res({rfid:'dummy'}),3000)})
  }
  
  let fetchFlow = ({token})=>{
    return auth(token)
      .then(({rfid})=>{
          return dummyDataAPI.getItem(rfid)}
        )
      .then(({item, time})=> {
        postMessage({item,time})
      })
  }

  let changeFlow = ({rfid,item})=>{
    rfid = 'dummy' //!todo : delete, use real ones from redux store
    return dummyDataAPI.changeItem(rfid,item)
      .then(({item, time})=> postMessage({item,time}))
      .catch(e=>postMessage({error:'change user item failed'}))
  }
  let fetchTimer
  // eslint-disable-next-line no-restricted-globals
  self.addEventListener('message',({data})=>{
    let {type, payload} = data
    switch(type){
      case 'spawn':
        Promise.all([
          fetchFlow(payload),
          setInterval(()=>fetchFlow(payload),10000)
        ]).then(values=>fetchTimer = values[1])
        .catch(e=>postMessage({error:'fetch user item failed'}))
          break;
      case 'changeItem':
        if(fetchTimer){console.log('removing'+fetchTimer);clearInterval(fetchTimer)}
        console.log(JSON.stringify(payload))
        Promise.all([
          changeFlow(payload),
          setInterval(()=>fetchFlow(payload),10000)
        ]).then(values=>fetchTimer = values[1])
        .catch(e=>postMessage({error:'fetch user item failed'}))
        break;
      case 'cancel':
        if(fetchTimer){clearInterval(fetchTimer)}
        dummyDataAPI.removeItem('dummy') //!todo: use paylod.rfid 
          .then(()=>postMessage({item:'',time:''}))
          .catch(e=>postMessage({error:'fetch user item failed'}))
      case 'terminate':
        if(fetchTimer){clearInterval(fetchTimer)}
        return
      default:
        throw new Error(`unknown message. ${JSON.stringify(data)}type:${type} payload:${JSON.stringify(payload)}`)
    }
  })
}

export default ()=>{
  let blob = new Blob(['('+wrapper.toString()+')()']);
  return new Worker(URL.createObjectURL(blob))
}
