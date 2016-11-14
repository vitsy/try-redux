import Immutable from 'immutable';
import logger from 'loglevel';
import { List, Map } from 'immutable';
//import clientSettingsStore from './clientSettingsStore';
import {
    ACTION1,
    RESET,
    HOME,
    NEW_SESSION,
    VOTE,
    CURRENT_USER,
    SHOW_VOTES,
    CALC,
    IO_TRY_JOIN_SESSION,
    IO_USERS,
    IO_RESET_VOTES,
    IO_VOTE,
    IO_JOIN,
    IO_LEAVE,
    IO_MSG
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
  let users;
  function calcVote(state){
       let k = 0;
       const  users = state.get('users');
       let voteAvg=0,
           voteAvgObj = users.reduce( (data, u)  => {
              const vote = u.get('vote');
              if (vote) {
                data.sum +=  parseFloat(vote);
                data.count++;
             }
              return data;
            }, {sum:0, cout:0});
            if (voteAvgObj.count > 0 ) {
              voteAvg = Math.round(100*voteAvgObj.sum/voteAvgObj.count)/100;
            }
    return state.set('voteAvg', voteAvg);
  }
   switch (action.type) {
     case HOME :
     case NEW_SESSION :
       return state
           .set('baseState', action.type)
           .set('userOwner', true);
     /*case JOIN_SESSION :
       return state
           .set('baseState', NEW_SESSION)
           .set('userOwner', false);*/
     case ACTION1:
       return state.set('text', action.text);
     case RESET:
       return state.set('text', '');
     case CURRENT_USER :
       return state.set('user', action.user);
     case SHOW_VOTES:
       return state.set('showStatistic', !state.get('showStatistic'));

     case IO_USERS:
       return state
           .set('users', Immutable.fromJS(action.msg.users))
           .set('sessionID', action.msg.sessionID)
           .set('baseState', VOTE);
     case IO_JOIN:
       users = state.get('users');
       return calcVote(state.set('users', users.push(Immutable.fromJS({user: action.user.user}))));
     case IO_TRY_JOIN_SESSION :
       return state
           .set('sessionID', action.msg.sessionID)
           .set('baseState', NEW_SESSION)
           .set('userOwner', false);
     case IO_LEAVE:
       const indLeave = state.get('users').findIndex( u => u.get('user') == action.user);
       return calcVote(indLeave >= 0 ? state.deleteIn(['users', indLeave]): state);
     case IO_RESET_VOTES:
       const nUsers = state.get('users').map(u =>  u.deleteIn(['vote']));
       return calcVote(state.set('users', nUsers));
     case IO_VOTE:
       const ind = state.get('users').findIndex( u => u.get('user') == action.msg.user);
       return calcVote(ind >=0 ? state.setIn(['users', ind, 'vote'], action.msg.vote): state);
     case IO_MSG:
       return state.set('msgs', state.get('msgs').push(action.msg.msg));
     default :
        log.debug('unknown action', action);
        return state;
  }
}
