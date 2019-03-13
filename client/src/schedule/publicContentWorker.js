/**
 * a simple worker used to update a mock schedule data
 * regularly, and send updated date to the app for the redux store to 
 * update accordingly
 * todo: change to a cors fetch to the actual data stored in the
 * server...
 * ps: 4th year project is great, yes, its great
 */

let wrapper = ()=>{
  const ITEMNAMES = ['item1','item2','item3','item4']
  let items ={
    data:{
      item1:0,
      item2:0,
      item3:0,
      item4:0
    },
    getTimeByName(key){
      return this.data[key]
    },
    setTimeByName(key,value){
      this.data[key] = value
    },
    getData(){
      return items.data
    }
  }

  let timer
  let updateItems = ()=>{
    let getRandomInt = (max)=>{
      return Math.floor(Math.random() * Math.floor(max));
    }
    return setInterval(()=>{
      ITEMNAMES.forEach((elem)=>items.setTimeByName(elem,getRandomInt(10)))
      postMessage(items.getData())
    },10000)
  }

  // eslint-disable-next-line no-restricted-globals
  self.addEventListener('message',({data})=>{
    switch(data){
      case 'spawn':
        postMessage(items.getData())
        timer = updateItems()
        break;
      case 'terminate':
        clearInterval(timer)
        return
      default:
        throw new Error(`unknown message ${data}`)
    }
  })
}

export default ()=>{
  let blob = new Blob(['('+wrapper.toString()+')()']);
  return new Worker(URL.createObjectURL(blob))
}
