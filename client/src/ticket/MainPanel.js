import React,{Component, useState, useContext} from 'react'
import {UserContext} from '../Context'
import {buyTicket} from '../apiCalls'
import {Button, Container, Card, CardTitle, CardText, Row, Col,CardBody, CardFooter, CardSubtitle, CardHeader } from 'reactstrap'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'


let TicketForm = ()=>{
  let {email, password, confirmationNumber,setConfirmationNumber} = useContext(UserContext)
  if(password===null) return 'please login to makePurchase'
  let [date, setDate] = useState(null)
  let [error, setError] =useState(null)
  let [status, setStatus] = useState(null)
  
 
  let handleChange = (date)=> {
    setDate(date)
  }
 
  let handleSubmit = (e)=>{
    e.preventDefault()
    if(date === null){
      setError('specify a date before purchase')
    }else{
      setStatus('fetching')
      buyTicket({email, password, date:moment(date).format('YYYY-MM-DD')})
      .then(res=>{
        setStatus('success')
        setConfirmationNumber(res.data)
      })
      .catch(err=>{
        setError('order can not be processed')
        setStatus('failed')
      })
    }
  }

  return (
    <Container>
    <div className='d-flex justify-content-center align-items-center'>
      <Col xs='auto'>
          <p className='mt-2 text-center text-secondary'>pick a date</p>
            <DatePicker
              inline
              selected={date}
              onChange={handleChange}
              placeholderText = 'click to select a date'
              isClearable = {true}
              minDate = {moment(new Date()).toDate()}
              maxDate = {moment('2019-12-31', 'YYYY-MM-DD').toDate()}
              disabledKeyboardNavigation={true}
            />
          <div className='d-flex justify-content-center'>
            <Button outline onClick={handleSubmit} disabled={status==='fetching'}>submit order</Button>
          </div>
      </Col>
      <Col xs='auto'>
        {status!=='success'?
          <div style={{maxWidth:'80%'}}>

            <div className='p-2 text-secondary' >Thank you for your order, order summary:</div>

            <div className='p-2'>confirmation Number:
              <span className='border border-danger'>{confirmationNumber}</span>
              <br />
              please save this number, you will need this to enter the park!
            </div>
            <div className='p-2'>date:<span className='border border-danger'>{date}</span></div>
          </div>
        :null} 
      </Col>
    </div>
    </Container>
  )
}

export default TicketForm