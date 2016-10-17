import React from 'react';
import { connect } from 'react-redux';
import StartSession from './StartSession.js';
import JoinSession from './JoinSession.js';

const Home = () => (
<div className="container-fluid">
    <div className="container">
      <h2>home</h2>
      <div className="row">
        <StartSession />
        <JoinSession />
      </div>
    </div>
  </div>
);
export default Home;
