"use strict";
import React from 'react';
import { connect } from 'react-redux';
import {Row, Col, Well, Button, FormControl} from 'react-bootstrap';
let sessionID2;
const JoinSession = () => (
    <Col sm={6}>
      <Well >
        <h4>Retrospective Session</h4>
        <Row>
          <Col sm={2} style={{width: "130px", marginLeft: "0px"}}>
            <Button bsStyle="primary" name="StartSession" >Start a Session</Button>
          </Col>
          <Col sm={1} style={{width:"120px",textAlign:"center"}}>
            <h4>... or ...</h4>
          </Col>
          <Col sm={2}  style={{width:"320px"}} >
            <Button bsStyle="primary" style={{float:"right"}}
                    name="JoinSession"  value="Join">Join a session</Button>
            <FormControl type="text"  style={{float:"right",width:"160px"}} ref={(r) => sessionID2 = r}
                         onkeypress="return isNumberKey(event, 5)"/>
          </Col>
        </Row>

    </Well>
    </Col>


);
export default JoinSession;