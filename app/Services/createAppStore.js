import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './rootReducer';
import communicator from './ioCommunicator';
import logger from 'loglevel';
import { setBaseState } from './actions.js';
import {
    ACTION1,
    HOME,
    IO_USERS,
    IO_JOIN,
    IO_LEAVE,
    IO_VOTE,
    IO_TRY_JOIN_SESSION,
    IO_RESET_VOTES,
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

  communicator.io.on('join', user => {
    store.dispatch({ type: IO_JOIN, user });
  });
  communicator.io.on('leave', user => {    //
    store.dispatch({ type: IO_LEAVE, user });
  });
  communicator.io.on('users', (msg) => {
    log.debug('users', msg);
    store.dispatch({ type: IO_USERS, msg }); // {users : sessionId:
  });
  communicator.io.on('vote', (msg) => {
    log.debug('vote', msg);
    store.dispatch({ type: IO_VOTE, msg }); // {users : sessionId:
  });
  communicator.io.on('reset', (msg) => {
    log.debug('reset', msg);
    store.dispatch({ type: IO_RESET_VOTES, msg });
  });
  communicator.io.on('badSession', (msg) => {
    log.debug('badSessiont', msg);
    store.dispatch(setBaseState(HOME));
  });

  communicator.io.on('goodSession', (msg) => {
    store.dispatch({ type: IO_TRY_JOIN_SESSION, msg});
  });

  return store;
}
