"use strict";
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { joinCommand, selectObserverCommand} from '../Services/actions';
import logger from 'loglevel';
import {Grid, Row, Col, Well, Button, ButtonGroup, FormControl, SplitButton, MenuItem} from 'react-bootstrap';
const log = logger.getLogger('NewSession');
const optionChanges = {};
const NewSession = (arg) => {
  const {showHistory, showDescription, playersCanShowVotes, observersCanShowVotes, playersCanResetVotes, observersCanResetVotes,
      joinCommand, userOwner, selectObserverCommand, dispatch} = arg;
  let userName;

  function onChangeOptionAction(arg) {
    log.debug(arg.currentTarget.checked +' '+arg.currentTarget.id);
    const nm = arg.currentTarget.id.substr(0, arg.currentTarget.id.length - 5);
    optionChanges[nm] = arg.currentTarget.checked;
  }

  const joinClick = function() {
    joinCommand(userName.value);
  }.bind(this);

  const onSelectObserver = function() {
    joinCommand(userName.value, undefined, true);
  }.bind(this);


  return (
      <Grid fluid={true}>
        <Row>
          <Col sm={3}></Col>
          <Col sm={6}>Name:
            <input type="text"  className="span2 toolTipDefault"
                   ref={(ref) => userName = ref}
                   title="" d/>
            <SplitButton onClick={joinClick} title="Join Session" bsStyle="primary"
                         onSelect={onSelectObserver} id="joinButton">
              <MenuItem eventKey="1" >Join as observer</MenuItem>
            </SplitButton>
          </Col>
          <Col sm={3}></Col>
        </Row>
      </Grid>
)}



NewSession.propTypes = {
  showHistory: React.PropTypes.bool,
  showDescription: React.PropTypes.bool,
  playersCanShowVotes: React.PropTypes.bool,
  observersCanShowVotes: React.PropTypes.bool,
  playersCanResetVotes: React.PropTypes.bool,
  observersCanResetVotes: React.PropTypes.bool,
  userOwner: React.PropTypes.bool,
  joinCommand: React.PropTypes.func,
  selectObserverCommand: React.PropTypes.func,
};

export default connect(
        state => ({
          showHistory: state.get('showHistory'),
          showDescription: state.get('showDescription'),
          playersCanShowVotes: state.get('playersCanShowVotes'),
          observersCanShowVotes: state.get('observersCanShowVotes'),
          playersCanResetVotes: state.get('playersCanResetVotes'),
          observersCanResetVotes: state.get('observersCanResetVotes'),
          userOwner: state.get('userOwner'),
        }),
        dispatch => bindActionCreators({joinCommand, selectObserverCommand}, dispatch)
)(NewSession);