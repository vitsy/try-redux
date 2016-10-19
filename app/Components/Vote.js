"use strict";
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PointButtons from './PointButtons.js';
import PlayerArea from './PlayerArea.js';
import ObserverArea from './ObserverArea.js';
import VoteRightColumn from './VoteRightColumn.js';

import logger from 'loglevel';
const log = logger.getLogger('Vote');

const Vote = (arg) => {
  const {sessionID, user} = arg;
  return (
      <div className="container-fluid">
        <div style={{position:'relative'}}>
          <div className="ppContainer">
            <div id="status" className="muted">Session ID: {sessionID}</div>
            <div className="row">
              <div className="span5">
                <div className="board site-hidden" style={{display: 'block'}}>
                  <h1 id="playerName">{user}</h1>

                  <div id="storyDescription">
                    <div>
                      <label>Story Description:</label>
                    </div>
                    <div>
                      <textarea className="span5 expand20-100 toolTipLong" title="" data-placement="right" data-original-title="Optional story details - shared with other players" style={{height: '20px', overflow: 'hidden', paddingTop: '0px', paddingBottom: '0px'}}></textarea>
                    </div>
                  </div>

                  <div className="row" style={{borderBbottom: '1px solid #eeeeee', marginBottom: '10px', paddingBbottom: '5px'}}>
                    <div className="span2">
                      <input id="resetVotes" type="button" value="Clear Votes" className="btn btn-primary toolTipLong" title="" data-placement="left" data-original-title="Use when voting is complete - votes will be cleared for all players &amp; observers"/>
                      </div>
                    <div className="span2">
                        <input id="showVotes" type="button" value="Show Votes" className="btn btn-primary toolTipLong" title="" data-placement="right" data-original-title="Show votes to all players (useful when a user is not responding)"/>
                      </div>
                  </div>
                  <PointButtons />
                  <PlayerArea />
                  <ObserverArea />

                  <h4 style={{marginTop: '50px'}} className="inviteLink" data-content="Invite a teammate!" data-original-title="" title="">Want to invite someone?  Send this link:</h4>
                  <div className="popover fade right in" style={{top: '338.5px', left: '743.5px', display: 'block'}}>
                    <div className="arrow"></div><h3 className="popover-title">You look lonely</h3><div className="popover-content">Invite a teammate!</div></div>
                  <p>
                    <a href="http://www.pointingpoker.com/68146">http://www.pointingpoker.com/68146</a>
                  </p>
                  <h4>...  or enter email addresses for invitees here:</h4>

                  <div className="row">
                    <div className="span3">
                      <textarea id="txtInviteEmailAddresses" className="expand20-100 span3" style={{height: '20px', overflow: 'hidden', paddingTop: '0px', paddingBottom: '0px'}}></textarea>
                    </div>
                    <div className="span2">
                      <input type="button" value="Send Invite" className="btn btn-small cst-btn-small site-hidden" id="btnSendInviteEmail"/>
                    </div>
                  </div>
                </div>
              </div>


              <VoteRightColumn />
            </div>
          </div>

        </div>
      </div>
  )
}

Vote.propTypes = {
  text: React.PropTypes.string,
  sessionID: React.PropTypes.string,
  user: React.PropTypes.string,
};

export default connect(
        state => ({
          sessionID : state.get('text'),
          user: state.get('text'),
    })
)(Vote);
