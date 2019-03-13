import {getTimeUpdate} from './fetchHelperLocal'

export const SET_USER_RFID = 'SET_USER_RFID'
export const SET_USER_ITEM = 'SET_USER_ITEM'
export const REMOVE_USER_ITEM = 'REMOVE_USER_ITEM'
export const REMOVE_USER = 'REMOVE_USER'
export const UPDATE_ITEMS = 'UPDATE_ITEMS'


export const updateTime = (items)=>{
  return {
    type: 'UPDATE_ITEMS_SUCCESS',
    items
  }
}

export const userSuccess = ({item,time})=>{
  return{
    type:'UPDATE_USER_SUCCESS',
    item,
    time
  }
}