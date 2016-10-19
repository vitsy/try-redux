import Immutable from 'immutable';
import logger from 'loglevel';
//import clientSettingsStore from './clientSettingsStore';
import {
    ACTION1,
    RESET,
    HOME,
    NEW_SESSION,
    VOTE,
    CURRENT_USER,
    IO_USERS,
    IO_JOIN,
    IO_LEAVE
    } from './appActionTypes';

const log = logger.getLogger('rootReducer');
/**
 * the root redux reducer that decides if
 * - the action should be handled by an event reducer (when a backend event gets applied to our client state)
 * - the action is a client-only action (some state changes in the client only, i.e. view state)
 *
 * @param state
 * @param {object} action the redux action
 * @returns {Immutable.Map} the modified state
 */
export default function rootReducer(state = {}, action = {}) {
   switch (action.type) {
     case HOME :
     case NEW_SESSION :
       return state.set('baseState', action.type)
     case ACTION1:
        return state.set('text', action.text);
     case RESET:
       return state.set('text', '');
    case CURRENT_USER :
      return state.set('user', action.user);
     case IO_USERS:
       return state
           .set('users', action.users)
           .set('sessionID', action.sessionID)
           .set('baseState', VOTE);

      default :
        log.debug('unknown action', action);
        return state;
  }
}
