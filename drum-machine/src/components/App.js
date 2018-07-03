import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";

import SampleContainer from "./Samples/SampleContainer";
import Transport from ".//Transport/Transport";
import Sequencer from "./Sequencer/Sequencer";
import "./App.css";

const context = new AudioContext();
let timer;
let totalRewind = 0;

class App extends Component {
  state = {
    isPlaying: false,
    currentBeat: 0,
    bpm: 100,
    sequenceLength: 16,
    tracks: 8,
    showPads: true,
  };

  componentDidMount() {
    context.suspend();
  }

  togglePads = () => {
    this.setState({
      showPads: !this.state.showPads,
    });
  }

  pressPlayPause() {
    if (!this.state.isPlaying) {
      this.play();
    } else {
      this.pause();
    }
  }

  play() {
    context.resume();
    const { bpm, sequenceLength } = this.state;
    timer = setInterval(() => {
      // this.setState({ currentBeat: this.state.currentBeat + 1 });
      const nextBeat = (Math.floor(context.currentTime * bpm/60) % sequenceLength) - totalRewind;
      if (nextBeat > this.state.currentBeat) {
      this.setState({
        isPlaying: true,
        currentBeat: nextBeat,
      });
    }
    }, context.currentTime + 50);
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

  changeSequenceLength = value => {
    this.setState({
      sequenceLength: value
    })
  }

  render() {
    return (
      <Container>
        <Transport
        context={context}
        changeBPM={this.changeBPM}
        play={() => this.play()}
        pause={() => this.pause()}
        time={context.currentTime}
        beat={this.state.currentBeat}
        togglePads={this.togglePads}
        />
        <SampleContainer 
          context={context}
          show={this.state.showPads} />
        <Sequencer
          context={context}
          tracks={this.state.tracks}
          currentBeat={this.state.currentBeat}
          sequenceLength={this.state.sequenceLength}
        />
    </Container>
    );
  }
}

export default App;
