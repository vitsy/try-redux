"use strict";
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { voteCommand } from '../Services/actions';
import logger from 'loglevel';
import {Grid, Row, Col, Button} from 'react-bootstrap';

const log = logger.getLogger('Vote');

const PointButtons = (arg) => {
  const rowSize = 4;
  const {points, voteCommand}  = arg;

  function pointButtonClick(evt) {
    log.debug('pointButtonClick');
    voteCommand(evt.currentTarget.attributes['data-point-value'].value);
  }

  let rows = [],
      row = [];
  points.map( (point, i) => {
    const b = (
      <Button bsStyle="primary" onClick = {pointButtonClick}
              className="vote_button" data-point-value={point.get('value')}>{point.get('text')}</Button>
              );
    rows.push(b);
    /* row.push(b);
   if ((i + 1) % rowSize === 0) {
      rows.push({row});
      row = [];
    }*/

  });
 /* if (row.length > 0) {
    rows.push(<Row className="vote-button-row"><Col>{row}</Col></Row>);
  }*/

  return (
  <div  id="pointButtons">
    {rows}
  </div>
  )}

PointButtons.propTypes = {
  text: React.PropTypes.string,
  points: React.PropTypes.oneOf([React.PropTypes.array, React.PropTypes.object]),//React.PropTypes.instanceOf(Immutable.List),//
  voteCommand : React.PropTypes.func
};

export default connect(
        state => ({
          text : state.get('text'),
          points : state.get('points'),
    }),
    dispatch => bindActionCreators({voteCommand}, dispatch)
)(PointButtons);
