import React from 'react';
import styled from 'styled-components';

const TransportContainer = styled.div`
  width: 100%;
  height: 50px;
  background: #616161;
  border: 1px solid black;
  border-radius: 5px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  color: #202020;
`;

const PlayButton = styled.div`
  height: 30px;
  background: white;
  border: 1px solid black;
  border-radius: 5px;
  padding: 4px 15px;
  margin-left: 10px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const PauseButton = styled.div`
  height: 30px;
  background: white;
  border: 1px solid black;
  border-radius: 5px;
  padding: 4px 15px;
  margin-left: 10px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const StopButton = styled.div`
  height: 30px;
  background: white;
  border: 1px solid black;
  border-radius: 5px;
  padding: 4px 15px;
  margin-left: 10px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const BPMLabel = styled.div`
  height: 30px;
  border-radius: 5px;
  padding: 4px;
  margin-left: 10px;
  font-weight: bold;
`;

const BPM = styled.input`
  height: 30px;
  background: white;
  border: 1px solid black;
  border-radius: 5px;
  padding: 4px;
  margin-left: 10px;
  font-weight: bold;
  max-width: 70px;
`;

const PadsToggle = styled.div`
  height: 30px;
  background: white;
  border: 1px solid black;
  border-radius: 5px;
  padding: 4px 15px;
  margin-left: 100px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const BeatIndicator = styled.div`
  height: 30px;
  border-radius: 5px;
  padding: 4px;
  margin-left: 10px;
  font-weight: bold;
`;

class Transport extends React.Component {
  render() {
    return (
      <TransportContainer>
        <PlayButton onClick={this.props.play}>PLAY</PlayButton>
        <PauseButton onClick={this.props.pause}>PAUSE</PauseButton>
        <StopButton onClick={this.props.stop}>STOP</StopButton>
        <BPMLabel>BPM</BPMLabel>
        <BPM defaultValue="80" onChange={this.props.changeBPM}/>
        <PlayButton onClick={() => this.props.clearSequences()}>CLEAR</PlayButton>
        <BeatIndicator>BEAT: {this.props.beat + 1}</BeatIndicator>
        <PadsToggle onClick={this.props.togglePads}>CONTROLS</PadsToggle>
      </TransportContainer>
    );
  }
}

export default Transport;
