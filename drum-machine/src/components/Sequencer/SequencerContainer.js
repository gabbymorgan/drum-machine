import React from "react";
import Sequencer from "./Sequencer";
import Timeline from "./Timeline";
import { Container, Row, Col, Button } from "reactstrap";

class SequencerContainer extends React.Component {
  render() {
    //read if play/pause is being played
    //read currentBeat and play every sequencer's sound if that sequencer is true for that beat
    //change current beat class on time bar
    //increment currentBeat
    return (
      <Container>
        <Sequencer />
        <Sequencer />
        <Sequencer />
        <Sequencer />
        <Sequencer />
        <Sequencer context={this.props.context} />
        <Timeline />
      </Container>
    );
  }
}

export default SequencerContainer;
