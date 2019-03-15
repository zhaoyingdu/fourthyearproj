import React, { Component ,useState,useEffect,useRef, useContext} from 'react'

import { Col, Button,ButtonGroup, Form, FormGroup, Label, Input,
       Container, FormText,Modal, ModalBody,UncontrolledDropdown,
       DropdownToggle,
       DropdownMenu,
       DropdownItem } from 'reactstrap';
import {UserContext} from '../Context'
import {login, register} from '../apiCalls'

import {
  Route,
  Link,
  Redirect
} from "react-router-dom";


let Register = (props)=> {
  let {setEmail, setPassword} = useContext(UserContext)
  //if(email!==null && password !== null) return null //render null
  let [status, setStatus] = useState(null)
  let [emailInput,setEmailInput] = useState('')
  let [passwordInput, setPasswordInput] = useState('')
  let [verifyPassword, setVerifyPassword] = useState('')

  let emailRef = useRef(null)
  let passwordRef = useRef(null)
  let verifyPasswordRef = useRef(null)

  let [pwdMatchMsg, setPwdMatchMsg] = useState('')
  let [emailValidationMsg, setEmailValidationMsg] = useState('')
  let [pwdValidationMsg, setPwdValidationMsg] = useState('')
  let [vPwdValidationMsg, setVPwdValidationMsg] = useState('')

  let { from } = props.location.state || { from: { pathname: "/" } };
  if(status === 'success'){
    return <Redirect to={from} />
  }

  let onLoginSubmit = (e) => {
    e.preventDefault()
    //input invalid
    
    if(passwordInput !== verifyPassword){
      setPwdMatchMsg('password does not match')
      setPassword('')
      setVerifyPassword('')
      return
    }

    if(!emailRef.current.validity.valid || !passwordRef.current.validity.valid|| !verifyPasswordRef.current.validity.valid){
      return
    }


    setStatus('fetching')
    register({email:emailInput,password:passwordInput}).then(()=>{
      setEmail(emailInput)
      setPassword(passwordInput)
      setStatus('success')
    }).catch((err)=>{
      setStatus('failed')
    })
  }
  let handleInputChange=(e)=>{
    setEmailInput(emailRef.current.value)
    setPasswordInput(passwordRef.current.value)    
    setVerifyPassword(verifyPasswordRef.current.value)
    setEmailValidationMsg(emailRef.current.validationMessage)
    setPwdValidationMsg(passwordRef.current.validationMessage)
    setVPwdValidationMsg(verifyPasswordRef.current.validationMessage)
  }

  return(
    <Modal isOpen={props.location.pathname === '/register'}>
      <ModalBody>
      <Container>
          <Form>
            <FormGroup row><Col xs={{size:'3', offset:1}} >Login</Col></FormGroup>
            <FormText>{status!=='fetching' && status!=='success' && status!==null? 'register '+status:null}</FormText>
            <FormGroup row disabled = {status==='fetching'}>
              <Label for='email' hidden>email</Label>
              <Col xs={{size:'10', offset:1}}>
                <Input name='email' innerRef={emailRef} type='email' value = {emailInput} required onChange={handleInputChange} placeholder='Email'/>
                <FormText color='warning'>{emailValidationMsg}</FormText>
              </Col>
            </FormGroup>
            <FormGroup row disabled={status === 'fetching'}>
              <Label for='password' hidden>password</Label>
              <Col xs={{size:'10', offset:1}}>
                <Input name='password' innerRef={passwordRef} type = 'password' value = {passwordInput} required onChange={handleInputChange} placeholder="Password"/>
                <FormText color='warning'>{pwdValidationMsg}</FormText>
              </Col> 
            </FormGroup>
            <FormGroup row disabled={status==='fetching'}>
              <Label for='verifyPassword' hidden>verifyPassword</Label>
              <Col xs={{size:'10', offset:1}}>
                <FormText color='warning'>{pwdMatchMsg}</FormText>
                <Input name='verifyPassword' innerRef={verifyPasswordRef} type = 'password' value = {verifyPassword} required onChange={handleInputChange} placeholder="Verify Password"/>
                <FormText color='warning'>{vPwdValidationMsg}</FormText>
              </Col> 
            </FormGroup>
            <FormGroup row disabled = {status==='fetching'}>
              <ButtonGroup>
              <Col xs={{size:'auto', offset:10 }}>
                <ButtonGroup>
                <Button onClick = {onLoginSubmit} outline color='primary' disabled={status==='fetching'}>submit</Button>
                <Button onClick = {()=>{props.history.goBack()}} outline color='secondary' disabled={status === 'fetching'}>cancel</Button>
                </ButtonGroup>
              </Col> 
              </ButtonGroup>
            </FormGroup>
          </Form>  
      </Container>
      </ModalBody>
      </Modal>
  )

}



let Login = (props)=> {
  let {setEmail, setPassword, setRfid} = useContext(UserContext)
  //if(email!==null && password !== null) return null //render null
  let [status, setStatus] = useState(null)
  let [emailInput,setEmailInput] = useState('')
  let [passwordInput, setPasswordInput] = useState('')
  let emailRef = useRef(null)
  let passwordRef = useRef(null)
  let [emailValidationMsg, setEmailValidationMsg] = useState('')
  let [pwdValidationMsg, setPwdValidationMsg] = useState('')

  let { from } = props.location.state || { from: { pathname: "/" } };
  if(status === 'success'){
    return <Redirect to={from} />
  }

  let onLoginSubmit = (e) => {
    e.preventDefault()
    //input invalid
    if(!emailRef.current.validity.valid || !passwordRef.current.validity.valid){
      return
    }
    setStatus('fetching')
    login({email:emailInput,password:passwordInput}).then(({data})=>{
      let {email, rfid} = data
      Object.keys(data).forEach(key=>{
        localStorage.setItem(key, data[key])
      })
      setEmail(emailInput)
      setPassword(passwordInput)
      setRfid(rfid||null)
      setStatus('success')
    }).catch((err)=>{
      setStatus('failed')
    })
  }
  let handleInputChange=(e)=>{
    setEmailInput(emailRef.current.value)
    setPasswordInput(passwordRef.current.value)
    setEmailValidationMsg(emailRef.current.validationMessage)
    setPwdValidationMsg(passwordRef.current.validationMessage)
  }

  return(
    <Modal isOpen = {props.location.pathname === '/login'}>
      <ModalBody>
      <Container>
          <Form>
            <FormGroup row><Col xs={{size:'3', offset:1}} >Login</Col></FormGroup>
            <FormText>{status!=='fetching' && status!=='success' && status!==null? 'login'+ status:null}</FormText>
            <FormGroup row disabled = {status==='fetching'}>
              <Label for='email' hidden>email</Label>
              <Col xs={{size:'10', offset:1}}>
                <Input name='email' innerRef={emailRef} type='email' value = {emailInput} required onChange={handleInputChange} placeholder='Email'/>
                <FormText color='warning'>{emailValidationMsg}</FormText>
              </Col>
            </FormGroup>
            <FormGroup row disabled={status === 'fetching'}>
              <Label for='password' hidden>password</Label>
              <Col xs={{size:'10', offset:1}}>
                <Input name='password' innerRef={passwordRef} type = 'password' value = {passwordInput} required onChange={handleInputChange} placeholder="Password"/>
                <FormText color='warning'>{pwdValidationMsg}</FormText>
              </Col> 
            </FormGroup>
            <FormGroup row disabled = {status==='fetching'}>
              <ButtonGroup>
              <Col xs={{size:'auto', offset:10 }}>
                <ButtonGroup>
                <Button onClick = {onLoginSubmit} outline color='primary' disabled={status==='fetching'}>submit</Button>
                <Button onClick = {()=>{props.history.goBack()}} outline color='secondary' disabled={status === 'fetching'}>cancel</Button>
                </ButtonGroup>
              </Col> 
              </ButtonGroup>
            </FormGroup>
          </Form>  
      </Container>
      </ModalBody>
      </Modal>
  )

}


let Auth = (props) => {
  let {email, password, setEmail, setPassword, setRfid} = useContext(UserContext)
  let loggedIn = email !== null && password !== null
  let logout = ()=>{
    setEmail(null)
    setPassword(null)
  }
  return (
      <div>
        <UncontrolledDropdown inNavbar>
        <DropdownToggle nav caret>
          {!email? 'users': email.split('@')[0]}
          </DropdownToggle>
          <DropdownMenu right>
              {!loggedIn
                ?<>
                  <DropdownItem><Link to="/login" className='text-secondary'>login</Link></DropdownItem>
                  <DropdownItem><Link to="/register" className='text-secondary'>register</Link></DropdownItem>
                </>
                :<>
                  <DropdownItem><Link to='/dashboard/orders'  className='text-secondary'>my order</Link></DropdownItem>
                  <DropdownItem><Link to='/dashboard/parking'  className='text-secondary'>my parking</Link></DropdownItem>
                  <DropdownItem><Link to='/dashboard/activities'  className='text-secondary'>my activities</Link></DropdownItem>
                  <DropdownItem onClick={logout} className='text-secondary'>logout</DropdownItem>
                </>
              }
          </DropdownMenu>
        </UncontrolledDropdown>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
  );
}

export {Auth}