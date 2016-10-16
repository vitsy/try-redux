import React from 'react';
import { connect } from 'react-redux';

const Home = () => (
    <div class="container">
      <h2></h2>
      <div class="row">
          <StartSession />
          <JoinSession />
      </div>
    </div>
);
export default Home;
