import {CartActionTypes} from './cart.types'
const INITIAL_STATE={
    MyCart:[],
    isLoading:true
}
export const CartReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type)
    {
        case CartActionTypes.ADD_TO_MY_CART:
            return {
                ...state,
                MyCart:[...state.MyCart,action.payload]
            }
        case 'NEW_CART':
            return {
                ...state,
                isLoading:false,
                MyCart:[...action.payload]
                
            }
            default:
            return{    
                ...state
             }
            
    }
}