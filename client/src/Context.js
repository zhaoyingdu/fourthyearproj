import React ,{useState}from 'react'


let UserContext = React.createContext()

let ContextProvider = (props)=>{
  let [email, setEmail] = useState('dcd0413@gmail.com')
  let [password, setPassword] = useState('zhaoyingdu')
  let [confirmationNumber, setConfirmationNumber] = useState([])
  let [rfid, setRfid] = useState(null)

  let initContext = {
    email:email,
    password:password,
    setEmail:email=>setEmail(email),
    setPassword:password=>setPassword(password),
    setConfirmationNumber:number=>setConfirmationNumber([...confirmationNumber,number]),
    setRfid: rfid=>setRfid(rfid)
  }
  
  return(
    <UserContext.Provider value = {initContext}>
      {props.children}
    </UserContext.Provider>
  )
}

export {ContextProvider, UserContext}