"use strict";
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { joinCommand } from '../Services/actions';
import logger from 'loglevel';
const log = logger.getLogger('NewSession');
const optionChanges = {};
const NewSession = (arg) => {
  const {showHistory, showDescription, playersCanShowVotes, observersCanShowVotes, playersCanResetVotes, observersCanResetVotes,
      joinCommand, dispatch} = arg;
  let userName;

  function onChangeOptionAction(arg) {
    log.debug(arg.currentTarget.checked +' '+arg.currentTarget.id);
    const nm = arg.currentTarget.id.substr(0, arg.currentTarget.id.length - 5);
    optionChanges[nm] = arg.currentTarget.checked;
  }

  function joinClick() {
    joinCommand(userName.value);
  }

  return (
    <div style={{position: "relative"}}>
      <div className="ppContainer">
        <div id="joinInfo" className="site-hidden span6" style={{display: "block"}}>

          <div className="row">
            <div className="span1">
              Name:
            </div>
            <div className="span2">
              <input type="text" id="txtName" className="span2 toolTipDefault"
                     ref={(ref) => userName = ref}
                     title="" data-original-title="The name other players will see for you"/>
            </div>
            <div className="span2" style={{marginLeft: "5px"}}>
                <div className="btn-group">
                  <button id="joinSession" className="btn btn-primary toolTipDefault" title=""
                          onClick={joinClick}
                          data-original-title="Join the session as a regular player">Join Session</button>
                  <button className="btn btn-primary dropdown-toggle" data-toggle="dropdown"><span className="caret"></span></button>
                  <ul className="dropdown-menu">
                    <li>
                      <a id="joinSessionAsObserver" className="toolTipDefault" data-placement="right" data-original-title="Observers are not required or able to vote">Join as observer</a>
                    </li>
                  </ul>
                </div>
            </div>

          </div>



        <div className="settingsArea">
          <ul className="nav nav-tabs">
            <li className="active">
              <a  href="#1" data-toggle="tab">Settings</a>
            </li>
            <li><a href="#2" data-toggle="tab">General Options</a>
            </li>
            <li><a href="#3" data-toggle="tab">Point Values</a>
            </li>
          </ul>

          <div className="tab-content ">
            <div className="tab-pane active" id="1">
              <fieldset>
                <legend>Settings</legend>
                <p>You can adjust how the application behaves by customizing the settings here.</p>
                <p>Settings will be saved when a session is started.</p>
                <a href="#" className="btn resetOptions">Reset Settings to Default</a>
                <br/><br/>
                <div className="settingsMessage"></div>
              </fieldset>
            </div>
            <div className="tab-pane" id="2">
              <fieldset>
                <legend>General Options</legend>
                <label className="checkbox">
                  <input type="checkbox" id="showDescriptionOption"
                         onChange={onChangeOptionAction}
                         checked={showDescription}/>Show Story Description
                  </label>
                  <label className="checkbox">
                    <input type="checkbox" id="showHistoryOption"
                           onChange={onChangeOptionAction}
                           checked={showHistory}/>Show History
                    </label>
                  </fieldset>
              <br/>
              <fieldset>
                <legend>Participants who are allowed to <em>show</em> votes</legend>
                <label className="checkbox">
                  <input type="checkbox" id="playersCanShowVotesOption" checked={playersCanShowVotes}/>Players
                  </label>
                  <label className="checkbox">
                    <input type="checkbox" id="observersCanShowVotesOption" checked={observersCanShowVotes}/>Observers
                    </label>
                  </fieldset>
              <br/>
              <fieldset>
                <legend>Participants who are allowed to <em>reset</em> votes</legend>
                <label className="checkbox">
                  <input type="checkbox" id="playersCanResetVotesOption" checked={playersCanResetVotes}/>Players
                  </label>
                  <label className="checkbox">
                    <input type="checkbox" id="observersCanResetVotesOption" checked={observersCanResetVotes}/>Observers
                    </label>
                  </fieldset>
            </div>
            <div className="tab-pane" id="3">
              <h3>add clearfix to tab-content (see the css)</h3>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>

)}



NewSession.propTypes = {
  text: React.PropTypes.string,
  showHistory: React.PropTypes.bool,
  showDescription: React.PropTypes.bool,
  playersCanShowVotes: React.PropTypes.bool,
  observersCanShowVotes: React.PropTypes.bool,
  playersCanResetVotes: React.PropTypes.bool,
  observersCanResetVotes: React.PropTypes.bool,
  joinCommand: React.PropTypes.func
};

export default connect(
        state => ({
          text : state.get('text'),
          showHistory: state.get('showHistory'),
          showDescription: state.get('showDescription'),
          playersCanShowVotes: state.get('playersCanShowVotes'),
          observersCanShowVotes: state.get('observersCanShowVotes'),
          playersCanResetVotes: state.get('playersCanResetVotes'),
          observersCanResetVotes: state.get('observersCanResetVotes'),
        }),
        dispatch => bindActionCreators({joinCommand}, dispatch)
)(NewSession);