import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './rootReducer';
import communicator from './ioCommunicator';
import logger from 'loglevel';

import {
    ACTION1,
    IO_USERS,
    IO_JOIN,
    IO_LEAVE
    } from './appActionTypes';
const log = logger.getLogger('createAppstore');

const loggerMiddleware = store => next => action => {
  log.debug('reducing action', action);
  let result = next(action);
  log.debug('modified state ', store.getState().toJS());
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

  communicator.io.on('join', (msg) => {
    store.dispatch({ type: IO_JOIN, msg });
  });
  communicator.io.on('leave', (msg) => {
    store.dispatch({ type: IO_LEAVE, msg });
  });
  communicator.io.on('users', (msg) => {
    log.debug('users', msg);
    store.dispatch({ type: IO_USERS, msg });
  });

  return store;
}
