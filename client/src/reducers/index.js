import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { reducer as formReducer } from 'redux-form';
import PropertyReducer from './propertyReducer';
import {CartReducer} from './cart/cartReducer'
export default combineReducers({
    auth: authReducer,
    property: PropertyReducer,
    cart:CartReducer,
    form: formReducer
});