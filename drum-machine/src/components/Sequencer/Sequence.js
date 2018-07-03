import React from 'react';
import styled from 'styled-components';

const LedContainer = styled.div`
  display: flex;
`;

const Led = styled.div`
  height: 60px;
  width: 5%;
  margin: 0 auto;
  border: 1px solid black;
  border-radius: 5px;
  background: ${props => (props.on ? '#4fc3f7' : '#757575')};
`;

class Timeline extends React.Component {
    state = {
      noteOn: []
    };

  componentDidUpdate() {
    if (this.state.noteOn[this.props.currentBeat]) {
      this.props.playSound(this.props.context, this.props.gain);
    }
  }

  componentDidMount() {
    const noteOn = [...Array(this.props.sequenceLength).keys()].fill(false);
    this.setState({
      noteOn,
    })
  }

  handleClick = index => {
    let { noteOn } = this.state;
    noteOn[index] = !noteOn[index];
    this.setState({
      noteOn,
    });
  };

  render() {
    return (
      <LedContainer>
        {this.state.noteOn.map((note, index) => {
          return <Led key={index} on={this.state.noteOn[index]} onClick={() => this.handleClick(index)} />
        })}
      </LedContainer>
    );
  }
}

export default Timeline;
