import React from 'react';
import {
    NEW_SESSION
    } from '../Services/actionTypes';

import { connect } from 'react-redux';
import { setBaseState } from '../Services/actions.js';

const StartSession = ({text, startNewSession}) => (
    <div className="span6" style={{width: "460px"}}>
        <div className="row well well-small" style={{margin: "0 auto"}}>
          <h4>Pointing Session</h4>
          <div className="span2" style={{width: "130px", marginLeft: "0px"}}>
            <button className="btn btn-primary" name="StartSession" onClick={startNewSession}>Start a Session</button>
          </div>
          <div className="span2 text-center" style={{width: "60px"}}>
            <h4 style={{margin: "0px"}}>... or ...</h4>
          </div>
          <div className="span2 joinExistingSession" style={{width: "120px"}}>
            <div className="input-append">
              <input type="text" className="span1" style={{width: "67px", height: "20px"}} onkeypress="return isNumberKey(event, 5)" name="JoinSessionId" placeholder="Session ID"/>
              <button className="btn btn-primary" name="JoinSession" value="Join">Join a session</button>
            </div>
        </div>
        </div>

    </div>
);

StartSession.propTypes = {
  text: React.PropTypes.string,
  startNewSession: React.PropTypes.fun
};

const mapStateToProps = function(state) {
  return {
    text: state.get('text')
  };
}

const mapDispatchToProps = function(dispatch){
  return {
    startNewSession: function(){ dispatch(setBaseState(NEW_SESSION)); },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(StartSession);
