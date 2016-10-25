import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import logger from 'loglevel';
const log = logger.getLogger('Vote');

const VoteRightColumn = (arg) => {
  const {showStatistic, voteAvg } = arg;

  let siteHidden = showStatistic ? 'statistics ' : 'statistics  site-hidden';
  return (
<div className="span4 pointing-right-column">
  <div className="pointTimer site-hidden" style={{opacity: '0', display: 'block'}}>
    <strong>Time:</strong> <span id="pointTimer" className="text-warning blink text-error bold-text">00:33:26</span>
  </div>
  <div className={siteHidden}>
    <h3>Statistics</h3>
    <div className="row">
      <div className="span2 statistics-points">
        <strong>Time taken:</strong>
      </div>
      <div id="timeTaken" className="span2 statistics-votes">0:30:57</div>
    </div>
    <div className="row">
      <div className="span2 statistics-points">
        <strong>Average:</strong>
      </div>
      <div id="averagePointValue" className="span2 statistics-votes"><div className="row"><div className="span4 average">{voteAvg}</div></div></div>
    </div>
    <div className="row pointVoteHeader">
      <div className="span2 statistics-points"><strong>Points</strong></div>
      <div className="span2 statistics-votes"><strong>Votes</strong></div>
    </div>
    <div id="pointVoteArea"><div className="row"><div className="span4 consensus"><strong>Consensus!</strong></div></div></div>
  </div>
</div>)}

VoteRightColumn.propTypes = {
  showStatistic: React.PropTypes.bool,
  voteAvg: React.PropTypes.string,
};

export default connect(
        state => ({
          showStatistic : state.get('showStatistic'),
          voteAvg : state.get('voteAvg'),
    })
)(VoteRightColumn);
