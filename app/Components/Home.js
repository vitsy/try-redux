import React from 'react';
import { connect } from 'react-redux';
import StartSession from './StartSession.js';
import JoinSession from './JoinSession.js';
import TestB from './TestB.js';
import {Grid, Row, Col} from 'react-bootstrap';
const Home = () => (
<Grid >
   <Row>
     <Col sm={3}></Col>
     <StartSession />
     <Col sm={3}></Col>
     {/*<JoinSession />*/}
  </Row>
</Grid>
);
export default Home;
