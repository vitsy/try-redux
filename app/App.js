import React from 'react';

import Header from './Components/Header';
import Content from './Components/Content';
var Favicon = require('react-favicon');

var faviconUrl = require('./Assets/favicon.ico');

module.exports = React.createClass({
  displayName: 'App',

  render: function () {
    return (<div>
              <Header/>
              <Content/>
              <Favicon url={ faviconUrl }/>
            </div>)
  }

});