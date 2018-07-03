import React, { Component } from 'react';
import { Container } from 'reactstrap';

import SampleContainer from './Samples/SampleContainer';
import Transport from './/Transport/Transport';
import Sequencer from './Sequencer/Sequencer';
import Mixer from './mixer';
import { generateIR } from '../sounds';
import './App.css';

/* MAIN AUDIO CONTEXT */
const context = new AudioContext();

/* MASTER GAIN NODE */
const masterGain = context.createGain();
masterGain.connect(context.destination);
masterGain.gain.value = 0.9;    // Master Volume Control

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

Object.values(gains).forEach(part => part.connect(masterGain));

/* SETUP DELAY */
const MAX_DELAY_TIME = 2;
const delay = context.createDelay(MAX_DELAY_TIME);
const delayInputGain = context.createGain();
const delayFeedback = context.createGain();
/* Delay internal signal path */
delay.connect(masterGain);
delayInputGain.connect(delay);
delayFeedback.connect(delay);
delay.connect(delayFeedback);
/* Delay FX Paramters */
delay.delayTime.value = 1;         // Delay Time
delayInputGain.gain.value = 0.5;   // Delay Volume
delayFeedback.gain.value = 0.5;    // Delay Feedback

/* SETUP REVERB */
const irBuffer = generateIR(context, 3, 2.5);
const reverb = context.createConvolver();
const reverbInputGain = context.createGain();
reverb.buffer = irBuffer;
reverbInputGain.connect(reverb);
reverb.connect(masterGain);
reverbInputGain.gain.value = 0.5;  // Reverb Volume

/* CONNECT DRUM SOUNDS TO REVERB */
// kickGain.connect(delayInputGain);
snareGain.connect(reverbInputGain);
hhOpenGain.connect(reverbInputGain);
hhClosedGain.connect(reverbInputGain);
tom1Gain.connect(reverbInputGain);
tom2Gain.connect(reverbInputGain);
aux1Gain.connect(reverbInputGain);
aux2Gain.connect(reverbInputGain);

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
    showPads: true,
    wasStopped: false,
    clear: false,
  };

  componentDidMount() {
    context.suspend();
  }

  clearSequences = () => {
    this.setState({
      clear: true,
    });
  }

  unsetClear = () => {
    this.setState({
      clear: false,
    })
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
  }, 1);
  }

  pause() {
    this.setState({
      isPlaying: false
    });
    clearInterval(timer);
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
    });
  };

  mixerHandler = (event) => {
    const name = event.target.name;
    let value = event.target.value / 100;

    if (name === "DelayVolume") {
      delayInputGain.gain.setValueAtTime(value, context.currentTime);
    }
    else if (name === "DelayTime") {
      value *= MAX_DELAY_TIME;
      // delay.delayTime.setValueAtTime(value, context.currentTime)
      delay.delayTime.linearRampToValueAtTime(value, context.currentTime + 0.1);
    }
    else if (name === "DelayVolume"){
      delayFeedback.gain.setValueAtTime(value, context.currentTime);
    }
    else if (name === 'ReverbVolume') {
      reverbInputGain.gain.setValueAtTime(value, context.currentTime);
    }
    else {
      console.log('Error in mixerHandler')
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
          stop = {() => this.stop()}
          clearSequences={this.clearSequences}
          time={context.currentTime}
          beat={this.state.currentBeat}
          togglePads={this.togglePads}
          changeSequenceLength={this.changeSequenceLength}
        />
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
          <SampleContainer
            context={context}
            gains={gains}
            show={this.state.showPads}
          />
          {this.state.showPads ?  <Mixer mixerHandler={this.mixerHandler}/> : null}
        </div>
        <Sequencer
          clear={this.state.clear}
          context={context}
          gains={gains}
          unsetClear={this.unsetClear}
          tracks={this.state.tracks}
          currentBeat={this.state.currentBeat}
          sequenceLength={this.state.sequenceLength}
        />
      </Container>
    );
  }
} // App Component Ends

export default App;
