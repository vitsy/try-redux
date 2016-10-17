import React from 'react';
import { connect } from 'react-redux';

const JoinSession = () => (
  <div className="span6" style={{width: "460px"}}>
    <form action="/Home/StartOrJoinRetroSession" method="post">
      <div className="row well well-small" style={{margin: "0 auto", position: "relative"}}>
        <h4>Retrospective Session</h4>
        <div className="span2" style={{width: "130px", marginLeft: "0px"}}>
          <button className="btn btn-primary" name="StartSession" value="Start">Start a Session</button>
        </div>
        <div className="span2 text-center" style={{width:"60px"}}>
          <h4 style={{margin: "0px"}}>... or ...</h4>
        </div>
        <div className="span2 joinExistingSession" style={{width: "120px"}}>
          <div className="input-append">
            <input type="text" className="span1" style={{width: "67px", height: "20px"}}
                   onkeypress="return isNumberKey(event, 5)" name="JoinSessionId" placeholder="Session ID"/>
              <button className="btn btn-primary" name="JoinSession" value="Join">Join a session</button>
            </div>
          </div>
      </div>
    </form>
  </div>
);
export default JoinSession;