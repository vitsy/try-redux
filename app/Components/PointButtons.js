"use strict";
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { voteCommand } from '../Services/actions';
import logger from 'loglevel';
const log = logger.getLogger('Vote');

const PointButtons = (arg) => {
  const rowSize = 4;
  const {points, voteCommand}  = arg;

  function pointButtonClick() {
    log.debug('click');
    voteCommand();
  }

  let rows = [],
      row = [];
  points.map( (point, i) => {
    const b = (<div className="span1">
                <input type="button" value={point.get('text')}
                       onClick={pointButtonClick} className="voteButton btn btn-info btn-mini btn-width" data-point-value={point.get('value')}/>
              </div>);
    if ((i + 1) % rowSize === 0) {
      rows.push(<div class="btn-row row">{row}</div>);
      row = [];
    } else {
      row.push(b);
    }

  });
  if (row.length > 0) {
    rows.push(<div class="btn-row row">{row}</div>);
  }

  return (
  <div id="pointButtons">
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
