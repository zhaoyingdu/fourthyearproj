import React, {useEffect, useContext, useState, userReducer} from 'react'
import {UserContext} from '../Context'
import {getAllOrders} from '../apiCalls'
import {Table, Jumbotron} from 'reactstrap'
import {Route,Link} from 'reactstrap'

import moment from 'moment'

let OrderTable = ({orderList, active})=>{
  return orderList.length === 0 
    ? <p className='text-black-50 mt-2' style={{fontSize:'0.5rem'}}>{active?'you don\'t have active orders': `you don't have expired orders`}</p>
    : (
    <table className='table table-borderless' >
      <thead>
        <tr className='text-secondary'>
          <th className='font-weight-lighter'>Order Number</th>
          <th className='font-weight-lighter'>order date</th>
          <th className='font-weight-lighter'>expire date</th>
        </tr>
      </thead>
      <tbody>
        {orderList.map(row=>{
          return (<tr key={row.confirmationnumber} className={active?'table-default':'table-secondary'}>
            <td className='font-weight-lighter' style={{fontSize:'0.8rem'}}>{row.confirmationnumber}</td>
            <td className='font-weight-lighter' style={{fontSize:'0.8rem'}}>{row.issuedate}</td>
            <td className='font-weight-lighter' style={{fontSize:'0.8rem'}}>{row.expiredate}</td>
          </tr>)
        })}
      </tbody>
    </table>)
}


let Orders = ()=>{
  let {email} = useContext(UserContext)
  let [pastOrder, setPastOrder] = useState([])
  let [activeOrder, setActiveOrder] = useState([])

  let fetchOrder = (email)=>{
    return getAllOrders({email})
      .then(({data})=>{
        let past = []
        let active = []
        for(let row of data){
          if(moment(row.expiredate).isBefore(moment(), 'day')){
            past.push(row)
          }else{
            active.push(row)
          }
        }
        setPastOrder(past)
        setActiveOrder(active)
      })
      .catch(e=>{
        console.log(e)
        setPastOrder([])
        setActiveOrder([])
      })
  }


  useEffect(()=>{
    if(email){
      fetchOrder(email)
    }
  }, [email])



  return !email
    ? null
    : <div className='d-flex justify-content-start ml-3 w-100'>
          <div className='w-50'>
            <div style={{fontSize:'1rem'}} className='font-weight-light mt-3 text-center'>active order</div>
            <div className='ml-1 mr-1'><OrderTable orderList = {activeOrder} active={true}/></div>
          </div>
          <div className='w-50'>
            <div style={{fontSize:'1rem'}} className='font-weight-light mt-3 text-center'>past orders</div>
            <div className='ml-1 mr-1'><OrderTable orderList = {pastOrder} active={false}/></div>
          </div>
      </div>
}

export default Orders