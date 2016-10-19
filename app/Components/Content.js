"use strict";
import React   from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import Home from './Home.js';
import NewSession from './NewSession.js';
import Vote from './Vote.js';
import logger from 'loglevel';
import {
    HOME,
    VOTE,
    NEW_SESSION,
    } from '../Services/appActionTypes';
const log = logger.getLogger('Content');
class Content extends React.Component {

  componentDidMount() {
  }

  render() {
    log.debug('CONTENT');
    const { text, baseState } = this.props;
    log.debug('Content: %s %j',baseState,this.props);
    if( baseState === HOME ) {
      return <Home />;
    } else if( baseState === NEW_SESSION){
      return <NewSession />;
    } else if( baseState === VOTE){
      return <Vote />;
    } else {
      return (
      <div>
        <Home />;
        <p>Here are some test Content <b ref='serverResponse'>{ this.state.serverData || 'Click the button to hit the API' }</b></p>
        <input ref='refreshButton' type='button' onClick={this.refreshData } value='Hit the server'></input>
      </div>)
    }
  }
}

Content.propTypes = {
  baseState: React.PropTypes.string,
  text: React.PropTypes.string
};

export default connect(
        state => ({
      text: state.get('text'),
      baseState: state.get('baseState')
    })
)(Content);
