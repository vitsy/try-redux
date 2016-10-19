import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import log from 'loglevel';
import initialState from './Services/initialAppState';
import createStore from './Services/createAppStore';
//import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
require("./Assets/style.css")
const App = require('./App.js');

log.setLevel('debug');
//localStorage.debug = 'socket.io-client:*'; // enable socket.io debugging


const store = createStore(initialState);
render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app-root')
);

