import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { reducer as formReducer } from 'redux-form';
import PropertyReducer from './propertyReducer';

export default combineReducers({
    auth: authReducer,
    property: PropertyReducer,
    form: formReducer
});