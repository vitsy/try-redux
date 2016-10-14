import { connect } from 'react-redux';
import React from 'react';
import {reset, setText} from '../Services/actions';

/*
const Header = React.createClass({
  displayName: 'Header',

  render: function () {
    return (
    	<div className='header'>
    	webpack react starter kit - {this.props.text}
    	</div>
		)
	}

});
*/
const Header = ({text, reset, fill}) => (
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
};


const mapStateToProps = function(state) {
	return {
		text: state.get('text')
	};
}

const mapDispatchToProps = function(dispatch){
	return {
		fill: function(){ dispatch(setText('Two')); },
		reset: function(){ dispatch(reset()); }
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);