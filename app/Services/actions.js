import {
    ACTION1,
    RESET,
    NEW_SESSION,
    HOME,
    CURRENT_USER,
    USERS,
    USER
    } from './appActionTypes';

import logger from 'loglevel';
const log = logger.getLogger('actions');
import communicator from './ioCommunicator';

// ui-only actions (client-side view state)
export const setText = text => ({type:ACTION1, text});
export const reset = () => ({type:RESET});

export const setBaseState = type => ({type});


//socketIO commands
export const joinCommand = (user, sessionID) => (dispatch, getState) => {
  const state = getState();
  communicator.send('join', {user, sessionID})
  dispatch({ type:CURRENT_USER, user})
};
export const voteCommand = (vote) => (dispatch, getState) => {
  const state = getState();
  log.info('voteCommand');
  //communicator.send('join', {user, sessionID})
};
