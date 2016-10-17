import Immutable from 'immutable';
//import clientSettingsStore from './clientSettingsStore';

/**
 * The initial state that is loaded into the redux store on (client) application load.
 */
const INITIAL_STATE = Immutable.fromJS({
  text: 'One',
  baseState: 'HOME',

  showHistory: true,
  showDescription: false,
  playersCanShowVotes: true,
  observersCanShowVotes: false,
  playersCanResetVotes: true,
  observersCanResetVotes: false,

});

export default INITIAL_STATE;
