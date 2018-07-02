import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";

import SampleContainer from "./Samples/SampleContainer";
import SequencerContainer from "./Sequencer/SequencerContainer";
import Transport from ".//Transport/Transport";
import "./App.css";

const context = new AudioContext();
let timer;

class App extends Component {
  state = {
    isPlaying: true,
    nextNoteTime: context.currentTime,
    currentBeat: 0,
    bpm: 100,
    sequenceLength: 32
  };

  startStop() {
    this.setState({
      isPlaying: !this.state.isPlaying,
    });
  }

  scheduler() {
    const timer = setInterval(() => {
      // this.setState({ currentBeat: this.state.currentBeat + 1 });
      this.setState({ nextNoteTime: context.currentTime });
    }, 50);
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
        <Button onClick={() => this.scheduler()}>Start</Button>
        <Button onClick={() => clearInterval(timer)}>Stop</Button>
      </Container>
    );
  }
}

export default App;
