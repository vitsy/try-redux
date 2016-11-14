import { connect } from 'react-redux';
import React from 'react';
import {reset, setText} from '../Services/actions';
import {Grid, Row, Col} from 'react-bootstrap';


const Header = ({text, reset, fill, baseState}) =>

	(
	//const { roomId, users, presetUsername } = this.props;

	<Grid className="header_holder" fluid={true}>
		<Row className="header">
			<Col sm={4}></Col>
			<Col sm={4} className="header_title">Test</Col>
			<Col sm={4}></Col>
		</Row>
	</Grid>


);

Header.propTypes = {
	text: React.PropTypes.string,
	reset: React.PropTypes.func,
	fill: React.PropTypes.func,
	baseState: React.PropTypes.string
};


const mapStateToProps = function(state) {
	return {
		text: state.get('text'),
		baseState: state.get('baseState')
	};
}

const mapDispatchToProps = function(dispatch){
	return {
		fill: function(){ dispatch(setText('Two')); },
		reset: function(){ dispatch(reset()); }
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);