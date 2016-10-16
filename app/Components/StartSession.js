import React from 'react';
import { connect } from 'react-redux';

const StartSession = () => (
    <div class="span6" style="width: 460px;">
      <form action="/Home/StartOrJoinSession" method="post">
        <div class="row well well-small" style="margin: 0 auto;">
          <h4>Pointing Session</h4>
          <div class="span2" style="width: 130px; margin-left: 0px;">
            <button class="btn btn-primary" name="StartSession" value="Start">Start a Session</button>
          </div>
          <div class="span2 text-center" style="width: 60px; ">
            <h4 style="margin: 0px;">... or ...</h4>
          </div>
          <div class="span2 joinExistingSession" style="width: 120px; ">
            <div class="input-append"><input type="text" class="span1" style="width: 67px; height: 20px;" onkeypress="return isNumberKey(event, 5)" name="JoinSessionId" placeholder="Session ID"><button class="btn btn-primary" name="JoinSession" value="Join">Join a session</button></div>
            </div>
          </div>
        </div>
      </form>
    </div>
);
export default StartSession