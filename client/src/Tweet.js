
import React, {useEffect, useState} from 'react'
import IO from 'socket.io-client'

 
let color = [
  'border-primary','border-secondary','border-success',
  'border-danger', 'border-warning','border-info',
  'border-light','border-dark','border-white'
]

let getRandomColor=()=>{
  return color[Math.floor(Math.random() * Math.floor(color.length-1))]
}

let Tweet = ({name, text})=>{
  let classname = `text-secondary border rounded p-2 ${getRandomColor()}`
  return (
    <div className={classname} style={{width:'50rem', fontSize:'0.8rem'}}>
      <div className=''>
        {name}
      </div>
      <div className='text-secondary border-top' style={{width:'50rem'}}>
        {text}
      </div>
    </div>
  )
}


let TweetList = ({list})=>{
  return(
    <div className='d-flex flex-column justify-content-center'>
     {list.slice(-10).map(li=>{
      return <Tweet key={li[0]} name={li[1]} text={li[2]} />
     })}
    </div>
  )
}

let TweetPanel = ()=>{
  let [tweetlist, setTweetList] = useState([])

  useEffect(()=>{
    const client = IO({
      reconnectionAttempts:40
    })
    client.on('tweet', (name, id, text)=>{
      setTweetList((prev)=>[...prev, [id,name,text]])
    })
    client.on('error', ()=>{    })
    client.on('connection error', ()=>{    })
    client.on('reconnection error', ()=>{    })
    return ()=>client.close()
  },[])
  
  return (<>
    <div className="text-center text-muted">twitter feeds on ottawa</div>
    <TweetList list={tweetlist} />
    </>)
}

export default TweetPanel