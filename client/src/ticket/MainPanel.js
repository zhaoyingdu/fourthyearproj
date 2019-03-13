import React,{Component, useState, useContext} from 'react'
import {UserContext} from '../Context'
import {buyTicket} from './apiCalls'
import {Button,  Card, CardTitle, CardText, Row, Col,CardBody, CardFooter, CardSubtitle, CardHeader } from 'reactstrap'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'


let TicketForm = ()=>{
  let {email, password, setConfirmationNumber} = useContext(UserContext)
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
        alert(JSON.stringify(res))
        setStatus('success')
        setConfirmationNumber(res.data)
      })
      .catch(err=>{
        alert(err)
        setError('order can not be processed')
        setStatus('failed')
      })
    }
  }

  return (
    <Row>
      <Col>
        <Card>
          <CardHeader>pick a date</CardHeader>
          <Card body className="text-center">
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
            <Button onClick={handleSubmit} disabled={status==='fetching'}>submit order</Button>
            <CardFooter color='mute'>{error}</CardFooter>
          </Card>
        </Card>
      </Col>
      <Col>
        <Card body className="text-center">
          <CardTitle >Thank you for your order</CardTitle>
          <CardSubtitle>confirmation Number:</CardSubtitle>
          <CardText color='warning'>000000,please save this number</CardText>
          <CardSubtitle>date:</CardSubtitle>
          <CardText>date</CardText>
        </Card>  
      </Col>
    </Row>
  )
}

export default TicketForm