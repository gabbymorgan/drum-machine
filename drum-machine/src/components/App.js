import React, { Component } from 'react';
import { Container } from 'reactstrap';

import SampleContainer from './Samples/SampleContainer';
import Transport from './/Transport/Transport';
import Sequencer from './Sequencer/Sequencer';
import Mixer from './mixer';
import './App.css';

/* MAIN AUDIO CONTEXT */
const context = new AudioContext();
/* MASTER GAIN NODE */
const masterGain = context.createGain();
masterGain.connect(context.destination);
masterGain.gain.value = 0.9;    // Master Volume Control

/* SETUP DELAY */
const MAX_DELAY_TIME = 3;
const delay = context.createDelay(MAX_DELAY_TIME);
const delayInputGain = context.createGain();
const delayFeedback = context.createGain();
/* Delay internal signal path */
delay.connect(masterGain);
delayInputGain.connect(delay);
delayFeedback.connect(delay);
delay.connect(delayFeedback);
/* Delay FX Paramters */
delay.delayTime.value = 0.5;       // Delay Time
delayInputGain.gain.value = 0.7;   // Delay Volume
delayFeedback.gain.value = 0.5;    // Delay Feedback

/* GAIN NODES FOR EACH DRUM PART */
const kickGain = context.createGain()
const snareGain = context.createGain()
const tom1Gain = context.createGain()
const tom2Gain = context.createGain()
const hhOpenGain = context.createGain()
const hhClosedGain = context.createGain();
const aux1Gain = context.createGain()
const aux2Gain = context.createGain();

const gains = {
  kick: kickGain,
  snare: snareGain,
  tom1: tom1Gain,
  tom2: tom2Gain,
  hhopen: hhOpenGain,
  hhclosed: hhClosedGain,
  aux1: aux1Gain,
  aux2: aux2Gain
};

// Connect all sounds o masterGain Node
Object.values(gains).forEach(part => part.connect(masterGain));

/* CONNECT DRUM SOUNDS TO DELAY */
// kickGain.connect(delayInputGain);
// snareGain.connect(masterGain);
hhOpenGain.connect(delayInputGain);
hhClosedGain.connect(delayInputGain);
tom1Gain.connect(delayInputGain);
tom2Gain.connect(delayInputGain);
aux1Gain.connect(delayInputGain);
aux2Gain.connect(delayInputGain);


let timer;
let totalRewind = 0;

// App Component
class App extends Component {
  state = {
    isPlaying: false,
    currentBeat: 0,
    bpm: 100,
    sequenceLength: 16,
    tracks: 8,
    showPads: true
  };

  componentDidMount() {
    context.suspend();
  }

  togglePads = () => {
    this.setState({
      showPads: !this.state.showPads
    });
  };

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
      const nextBeat =
        (Math.floor((context.currentTime * bpm) / 60) % sequenceLength) -
        totalRewind;
      if (nextBeat !== this.state.currentBeat) {
        this.setState({
          isPlaying: true,
          currentBeat: nextBeat
        });
      }
    }, context.currentTime + 50);
  }

  pause() {
    this.setState({
      isPlaying: false
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
    });
  };

  delayHandler = (event) => {
    const name = event.target.name;
    let value = event.target.value / 100;
    if (name === "DelayVolume") {
      delayInputGain.gain.setValueAtTime(value, context.currentTime)
    } 
    else if (name === "DelayTime") {
      // value *= MAX_DELAY_TIME;
      delay.delayTime.setValueAtTime(value, context.currentTime)
    } else {
      delayFeedback.gain.setValueAtTime(value, context.currentTime)
    }
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
          changeSequenceLength={this.changeSequenceLength}
        />
        <SampleContainer
          context={context}
          gains={gains}
          show={this.state.showPads}
        />
        <Sequencer
          context={context}
          gains={gains}
          tracks={this.state.tracks}
          currentBeat={this.state.currentBeat}
          sequenceLength={this.state.sequenceLength}
        />
        <Mixer delayHandler={this.delayHandler} />
      </Container>
    );
  }
} // App Component Ends

export default App;
