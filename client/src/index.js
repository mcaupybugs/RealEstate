import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
const middleWare=[reduxThunk,logger]
const store = createStore(reducers, applyMiddleware(...middleWare));
ReactDOM.render(
    <Provider store={store}>
        <App /></Provider>
    , document.querySelector('#root'));