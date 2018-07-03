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
    bpm: 120,
    sequenceLength: 16,
    tracks: 8,
    showPads: true,
    wasStopped: false
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
    let timeSinceLastStop = 0;

    if (this.state.wasStopped) {

      this.setState({

        wasStopped: false

      });

      timeSinceLastStop = context.currentTime;

    }
    timer = setInterval(() => {
      // this.setState({ currentBeat: this.state.currentBeat + 1 });
      let nextBeat = (Math.floor((context.currentTime - timeSinceLastStop) * bpm/60*sequenceLength/4) % sequenceLength);
      if (nextBeat !== this.state.currentBeat) {
      this.setState({
        isPlaying: true,
        currentBeat: nextBeat,
      });
    }
  }, context.currentTime + 1);
  }

  pause() {
    this.setState({
      isPlaying: false,
    });
    clearInterval(timer);
    totalRewind = new Date();
    context.suspend();
  }

  stop() {

    clearInterval(timer);
    this.setState({
      isPlaying: false,
      wasStopped: true
    });
    context.suspend();
    totalRewind = context.currentTime;

  }

  changeBPM = value => {
    this.setState({
      bpm: value.target.value
    });
    console.log("Changed bpm to " + value.target.value);
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
        stop={() => this.stop()}
        time={context.currentTime}
        beat={this.state.currentBeat}
        togglePads={this.togglePads}
        changeSequenceLength={this.changeSequenceLength}
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
