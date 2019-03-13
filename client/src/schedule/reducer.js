const initState = {
  
  items:{
    status:null,
    item1:0,
    item2:0,
    item3:0,
    item4:0
  },
  user:{
    status: null,
    item: null,
    time: null
  }
}

const reducer = (state=initState,action)=>{
  switch(action.type){
    case 'USER_ITEM_REQUEST':
      return {...state, user:{...state.user, status: 'fetching'}}
    case 'USER_ITEM_FAILURE':
      return {...state, user:{...state.user, status: action.error}}
    case 'USER_ITEM_SUCCESS':
      return {...state, user:{...state.user,item: action.item, time: action.time ,status: 'success'}}
    case 'UPDATE_ITEMS_REQUEST':
      return {...state, items:{...state.items, status: 'fetching'}}
    case 'UPDATE_ITEMS_SUCCESS':
      return {...state, items:{...action.items, status: 'success'}}
    case 'UPDATE_ITEMS_FAILURE':
      return {...state, items:{...state.items, status: action.error}}
    default:
      return state
  }
}

export default reducer