import {CartActionTypes} from './cart.types'
const INITIAL_STATE={
    MyCart:[],
    isLoading:true,
    totalPrice:0
}
export const CartReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type)
    {
        case CartActionTypes.ADD_TO_MY_CART:
            return {
                ...state,
                MyCart:[...state.MyCart,action.payload],
                totalPrice:state.totalPrice+action.payload.Price
            }
        case 'NEW_CART':
            return {
                ...state,
                isLoading:false,
                MyCart:action.payload.data.data,
                totalPrice:action.payload.data.data.reduce((value,item)=>value=value+item.Price,0)
                
            }
        case 'DELETE_MY_CART_ITEM':
            return {
                ...state,
                isLoading:false,
                MyCart:state.MyCart.filter((val)=>{
                    if(val._id!=action.payload.property_id){
                        return true;
                    }
                }),
                totalPrice:state.MyCart.reduce((value,item)=>value=value+(action.payload.property_id!=item._id?item.Price:0),0)
            }
            default:
            return{    
                ...state
             }
            
    }
}