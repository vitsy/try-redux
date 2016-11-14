import React from 'react';
import {
    NEW_SESSION,
    JOIN_SESSION,
    } from '../Services/appActionTypes';

import { connect } from 'react-redux';
import { setBaseState, tryJoin } from '../Services/actions.js';
import {Row, Col, Well, Button, FormControl} from 'react-bootstrap';
let sessionID;
const StartSession = ({ startNewSession, joinExistingSession, sessionMsg}) => {
      return (
          <Col sm={6}>
            <Well >
              <h4>Pointing Session</h4>
                <Row>
                  <Col sm={2} style={{width:"120px"}}>
                    <Button bsStyle="primary" name="StartSession" onClick={startNewSession}>Start a Session</Button>
                  </Col>
                  <Col sm={1} style={{width:"120px",textAlign:"center"}}>
                    <h4>... or ...</h4>
                  </Col>
                  <Col sm={2}  style={{width:"300px", paddingRight:"0px"}} >
                    <Button bsStyle="primary" style={{float:"right"}}
                            name="JoinSession" onClick={joinExistingSession} value="Join">Join a session</Button>
                    <input type="text"  style={{float:"right",width:"160px"}} ref={(r) => sessionID = r}
                            name="JoinSessionId" placeholder="Session ID"/>
                    <span style={{paddingLeft:"10px", color:"red"}}>{sessionMsg}</span>
                  </Col>
              </Row>

            </Well>
          </Col>

  );

}

StartSession.propTypes = {
  text: React.PropTypes.string,
  startNewSession: React.PropTypes.func,
  sessionID: React.PropTypes.string,
  sessionMsg: React.PropTypes.string,
   joinExistingSession: React.PropTypes.func,
};

const mapStateToProps = function(state) {
  return {
    sessionMsg: state.sessionMsg
  };
}

const mapDispatchToProps = function(dispatch){
  return {
    startNewSession: function(){ dispatch(setBaseState(NEW_SESSION)); },
    joinExistingSession: function(){ dispatch(tryJoin(sessionID.value))}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(StartSession);
