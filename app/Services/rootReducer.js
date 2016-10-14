import Immutable from 'immutable';

//import clientSettingsStore from './clientSettingsStore';
import {
    ACTION1,
    RESET
    } from './actionTypes';


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
      case ACTION1:
        return state.set('text', action.text);
     case RESET:
       return state.set('text', '');
      default :
        console.log('unknown action', action);
        return state;
  }
}
