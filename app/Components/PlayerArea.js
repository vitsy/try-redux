"use strict";
import React from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import { bindActionCreators } from 'redux';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import logger from 'loglevel';
const log = logger.getLogger('Vote');

const PlayerArea = (arg) => {
  const {users,  showStatistic, user} = arg,

      rows = users.map(u => {
        const vote = u.get('vote') || '',
            rowUser = u.get('user'),
            canShowVote =  showStatistic || user ==  rowUser;
        return (
            <Row  className="player">
              <Col sm={8}  className="playerName">
                <i className="icon"></i>{rowUser}</Col>
              <Col sm={4}  className={canShowVote ? '' : 'vote_hidden'}>{vote}</Col>
            </Row>)});
  return (
      <Grid id="playerArea">
        <Row className="player_area_header">
          <Col sm={8}>
            <strong>Player</strong>
          </Col>
          <Col sm={4}>
            <strong>Points</strong>
          </Col>
        </Row>
        {rows}
      </Grid>
  )}
PlayerArea.propTypes = {
  text: React.PropTypes.string,
  showStatistic: React.PropTypes.bool,
  users: React.PropTypes.oneOf([React.PropTypes.array, React.PropTypes.object]),//React.PropTypes.instanceOf(Immutable.List)
};

export default connect(
        state => ({
      text : state.text, //get('text'),
      users  : state.users,//get('users'),
      showStatistic: state.get('showStatistic')
    })
)(PlayerArea);

