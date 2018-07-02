import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";

import SampleContainer from "./Samples/SampleContainer";
import SequencerContainer from "./Sequencer/SequencerContainer";
import Transport from ".//Transport/Transport";
import "./App.css";

const context = new AudioContext();
let timerID;

class App extends Component {
  state = {
    nextNoteTime: 0,
    currentBeat: 0,
    bpm: 100,
    sequenceLength: 32
  };

  scheduler() {
    const { nextNoteTime } = this.state.nextNoteTime;
    while (nextNoteTime < context.currentTime + 0.1) {
      this.setState({
        nextNoteTime: nextNoteTime + 0.5
      });
    }
    timerID = window.setTimeout(this.scheduler, 50.0);
  }

  changeBPM = value => {
    this.setState({
      bpm: value
    });
  };

  render() {
    return (
      <Container>
        <SampleContainer />
        <SequencerContainer
          context={context}
          sequenceLength={this.state.sequenceLength}
        />
        <h1>{this.state.nextNoteTime}</h1>
        <Transport context={context} changeBPM={this.changeBPM} />
        <Button onclick={() => this.scheduler()}>Start</Button>
        <Button onclick={() => clearTimeout(timerID)}>Stop</Button>
      </Container>
    );
  }
}

export default App;
