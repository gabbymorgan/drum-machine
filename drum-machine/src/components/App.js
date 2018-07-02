import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import SampleContainer from "./Samples/SampleContainer";
import Sequencer from "./Sequencer/Sequencer";
import Transport from ".//Transport/Transport";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Container>
        <SampleContainer />
        <Sequencer />
        <Transport />
      </Container>
    );
  }
}

export default App;
