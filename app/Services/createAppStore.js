import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './rootReducer';

import {
    ACTION1
    } from './actionTypes';


const loggerMiddleware = store => next => action => {
  console.log('reducing action', action);
  let result = next(action);
  console.log('modified state ', store.getState().toJS());
  return result;
};

/**
 * configures and sets up the redux store.
 *
 * @param {Immutable.Map} [initialState]
 * @param {object} the redux store
 */
export default function createAppStore(initialState) {
  let store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(
          thunkMiddleware,
          loggerMiddleware
      )
  );
  return store;
}
