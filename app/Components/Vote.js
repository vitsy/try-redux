"use strict";
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PointButtons from './PointButtons.js';
import PlayerArea from './PlayerArea.js';
import ObserverArea from './ObserverArea.js';
import VoteRightColumn from './VoteRightColumn.js';
import {showVotes, resetVotes, sendMsg} from '../Services/actions';
import {Grid, Row, Col, Button, FormControl} from 'react-bootstrap';

import logger from 'loglevel';
const log = logger.getLogger('Vote');

const Vote = (arg) => {
  let newMsg;
  const {sessionID, user, showVotes, resetVotes, sendMsg, showStatistic, msgs} = arg;
  function msgClick() {
    sendMsg({msg:newMsg.value});
  }
  let messages =  msgs.map( (msg, i) =>
      (<li>{msg.msg}</li>))
  document.getElementById("your_div");
 // objDiv.scrollTop = objDiv.scrollHeigh
  return (
      <Grid fluid={true}>
        <Row>
          <Col sm={1}>
          </Col>
          <Col sm={3}>
            <span id="status" >Session ID: <b>{sessionID}</b></span>
           </Col>
          <Col sm={7}>
            <span id="playerName">User:<b>{user}</b></span>
          </Col>
          </Row>

        <Row>
          <Col sm={1}></Col>
          <Col sm={3}>
            <div id="storyDescription">
              <div>
                <label>Story Description:</label>
              </div>
              <div id="messages">
                <ul>{messages}</ul>
              </div>
            </div>
            <input id="new-message" type="text"  ref={(ref) => newMsg = ref} />
            <Button  bsStyle="primary" onClick={msgClick}>Send Msg</Button>
          </Col>
          <Col sm={4}>
            <PointButtons />
          </Col>
          <Col sm={3}>
                  <Button bsStyle="primary" name="ShowVotes" className="btn-align-right" onClick={showVotes}>Show Votes</Button>
                  <Button bsStyle="primary" name="ClearVotes" className="btn-align-right" onClick={resetVotes}>Clear Votes</Button>
                 <PlayerArea />
                 <ObserverArea />
                 <VoteRightColumn />
          </Col>
          <Col sm={1}></Col>
        </Row>
       </Grid>
  )
}

Vote.propTypes = {
  text: React.PropTypes.string,
  sessionID: React.PropTypes.string,
  user: React.PropTypes.string,
  showVotes:  React.PropTypes.func,
  resetVotes:  React.PropTypes.func,
  sendMsg:  React.PropTypes.func,
  showStatistic: React.PropTypes.bool,
  msgs:React.PropTypes.oneOf([React.PropTypes.array, React.PropTypes.object])
};

export default connect(
        state => ({
          sessionID : state.get('sessionID'),
          user: state.get('user'),
          msgs: state.get('msgs'),
          showStatistic: state.get('showStatistic')
    }),
        dispatch => bindActionCreators({showVotes, resetVotes, sendMsg}, dispatch)
)(Vote);
