import React ,{useState}from 'react'


let UserContext = React.createContext()

let ContextProvider = (props)=>{
  let [email, setEmail] = useState(localStorage.getItem('email')||null)
  let [password, setPassword] = useState(localStorage.getItem('password')||null)
  let [confirmationNumber, setConfirmationNumber] = useState([])
  let [rfid, setRfid] = useState(localStorage.getItem('rfid')||null)

  let initContext = {
    email:email,
    password:password,
    confirmationNumber:confirmationNumber,
    rfid:rfid,
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