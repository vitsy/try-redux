"use strict";
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import logger from 'loglevel';
const log = logger.getLogger('Vote');

const ObserverArea = (arg) => {
  return (
      <div id="observerArea" className="site-hidden">
        <div className="header row">
          <div className="span3">
            <strong>Observer</strong>
          </div>
        </div>
      </div>
  )}

ObserverArea.propTypes = {
  text: React.PropTypes.string,
};

export default connect(
        state => ({
      text : state.get('text'),
    })
)(ObserverArea);

