import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import initialState from './services/initialAppState';
import createStore from './services/createAppStore';

require("./Assets/style.scss")



var App = require('./App.js');

const store = createStore(initialState);
render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app-root')
);

