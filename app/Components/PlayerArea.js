"use strict";
import React from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { bindActionCreators } from 'redux';
import logger from 'loglevel';
const log = logger.getLogger('Vote');

const PlayerArea = (arg) => {
  const {users} = arg,
      rows = users.map(u => (
          <div  className="row player">
            <div className="span3 playerName">
              <i className="icon"></i>{u.get('user')}</div>
            <div className="span1 playerPoints" >{u.get('vote')}</div>
          </div>));
  return (
      <div id="playerArea">
        <div className="header row">
          <div className="span3">
            <strong>Player</strong>
          </div>
          <div className="span1">
            <strong>Points</strong>
          </div>
        </div>
        {rows}
      </div>
  )}
PlayerArea.propTypes = {
  text: React.PropTypes.string,
  users: React.PropTypes.instanceOf(Immutable.List)

};

export default connect(
        state => ({
      text : state.get('text'),
      users  : state.get('users'),
    })
)(PlayerArea);

