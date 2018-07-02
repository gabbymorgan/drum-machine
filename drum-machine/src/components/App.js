import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";

import SampleContainer from "./Samples/SampleContainer";
import SequencerContainer from "./Sequencer/Sequencer";
import Transport from ".//Transport/Transport";
import "./App.css";
import Sequencer from "./Sequencer/Sequencer";

import { kick, snare, hhopen, hhclosed, tom1, tom2, aux1, aux2 } from './sounds'

const context = new AudioContext();
let timer;
let lastStop = 0;
let totalRewind = 0;

class App extends Component {
  state = {
    isPlaying: true,
    currentBeat: 0,
    bpm: 60,
    sequenceLength: 32,
    tracks: 8,
    isStopped: false,
  };

  componentDidMount() {

    context.suspend();

  }

  start() {
    context.resume();
    const { bpm, sequenceLength, nextNoteTime } = this.state;
    let { currentBeat } = this.state;

    if (this.state.isStopped) {

      totalRewind += currentBeat;

    }

    timer = setInterval(() => {

      // this.setState({ currentBeat: this.state.currentBeat + 1 });
      this.setState({
        isPlaying: true,
        currentBeat: (Math.floor(context.currentTime * bpm/60) % sequenceLength) - totalRewind,
        isStopped: false
      });
    }, 50);
  }

  stop() {
    context.suspend();
    lastStop = context.currentTime;
    this.setState({
      isPlaying: false,
      isStopped: true,
    });
    clearInterval(timer);
  }

  pause() {
    this.setState({
      isPlaying: false,
    });
    clearInterval(timer);
    context.suspend();
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
        <Sequencer
          context={context}
          tracks={this.state.tracks}
          currentBeat={this.state.currentBeat}
          sequenceLength={this.state.sequenceLength}
        />
        <h1>{context.currentTime}</h1>
        <h1>{this.state.currentBeat}</h1>
        <Transport context={context} changeBPM={this.changeBPM} />
        <Button onClick={() => this.start()}>Start</Button>
        <Button onClick={() => this.pause()}>Pause</Button>
        <Button onClick={() => this.stop()}>Stop</Button>
      </Container>
    );
  }
}

export default App;
