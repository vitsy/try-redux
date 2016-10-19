import { connect } from 'react-redux';
import React from 'react';
import {reset, setText} from '../Services/actions';


const Header = ({text, reset, fill, baseState}) =>

	(
	//const { roomId, users, presetUsername } = this.props;


	<div className='header'>
			webpack react starter kit4 - {text}
			<button onClick={reset}>Reset</button>
			<button onClick={fill}>Fill</button>
		</div>
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