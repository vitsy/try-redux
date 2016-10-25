import React from 'react';
import {
    NEW_SESSION,
    JOIN_SESSION,
    } from '../Services/appActionTypes';

import { connect } from 'react-redux';
import { setBaseState, tryJoin } from '../Services/actions.js';

let sessionID;
const StartSession = ({ startNewSession, joinExistingSession, setBaseState}) => {
      return (
      <div className="span6" style={{width: "460px"}}>
        <div className="row well well-small" style={{margin: "0 auto"}}>
          <h4>Pointing Session</h4>
          <div className="span2" style={{width: "130px", marginLeft: "0px"}}>
            <button className="btn btn-primary" name="StartSession" onClick={startNewSession}>Start a Session</button>
          </div>
          <div className="span2 text-center" style={{width: "60px"}} >
            <h4 style={{margin: "0px"}}>... or ...</h4>
          </div>
          <div className="span2 joinExistingSession" style={{width: "120px"}}>
            <div className="input-append">
              <input type="text" className="span1" style={{width: "67px", height: "20px"}} onkeypress="return isNumberKey(event, 5)"
                     ref={(r) => sessionID = r} placeholder="Session ID"/>
              <button className="btn btn-primary" name="JoinSession" onClick={joinExistingSession} value="Join">Join a session</button>
            </div>
          </div>
        </div>

      </div>
  );

}

StartSession.propTypes = {
  text: React.PropTypes.string,
  startNewSession: React.PropTypes.func,
  sessionID: React.PropTypes.string,
  //joinCommand: React.PropTypes.func,
  joinExistingSession: React.PropTypes.func,
};

const mapStateToProps = function(state) {
  return {
    //sessionID: state.get('sessionID')
  };
}

const mapDispatchToProps = function(dispatch){
  return {
    startNewSession: function(){ dispatch(setBaseState(NEW_SESSION)); },
    joinExistingSession: function(){ dispatch(tryJoin(sessionID.value))}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(StartSession);
