import Immutable from 'immutable';
//import clientSettingsStore from './clientSettingsStore';

/**
 * The initial state that is loaded into the redux store on (client) application load.
 */
const INITIAL_STATE = Immutable.fromJS({
  text: 'One',
  baseState: 'HOME',
  users: [], //{user: vote:}
  msgs: [],
  user: '',
  userOwner: false,
  sessionID: '',
  points:[{text:'0 points', value:'0'}, {text:'1 points', value:'1'}, {text:'2 points', value:'2'} ,
    {text:'3 points', value:'3'},{text:'5 points', value:'5'},{text:'10 points', value:'10'}],

  showHistory: true,
  showDescription: false,
  playersCanShowVotes: true,
  observersCanShowVotes: false,
  playersCanResetVotes: true,
  observersCanResetVotes: false,


  showStatistic: false,
  voteAvg: '0',

});

export default INITIAL_STATE;
