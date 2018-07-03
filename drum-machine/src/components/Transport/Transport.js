import React from 'react';
import styled from 'styled-components';

const TransportContainer = styled.div`
  width: 100%;
  height: 50px;
  background: #e0e0e0;
  border: 1px solid black;
  border-radius: 5px;
  margin-top: 20px;
  display: flex;
  align-items: center;
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
`;

const PadsToggle = styled.div`
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
        <BPM defaultValue="120" onChange={this.props.changeBPM}/>
        <PadsToggle onClick={this.props.togglePads}>DRUM PADS</PadsToggle>
        <BeatIndicator>BEAT: {this.props.beat + 1}</BeatIndicator>
      </TransportContainer>
    );
  }
}

export default Transport;
