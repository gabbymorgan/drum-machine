import React from "react";
import styled from "styled-components";

const LedContainer = styled.div`
  display: flex;
`;

const Led = styled.div`
  height: 60px;
  width: 5%;
  margin: 0 auto;
  border: 1px solid black;
  border-radius: 5px;
  background: ${props => (props.on ? "#4fc3f7" : "#e0e0e0")};
`;

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteOn: []
    };
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
    console.log(noteOn);
    this.setState({
      noteOn,
    });
  };

  render() {
    return (
      <LedContainer>
        {this.state.noteOn.map((note, index) => {
          return <Led id={index} on={this.state.noteOn[index]} onClick={() => this.handleClick(index)} />
        })}
      </LedContainer>
    );
  }
}

export default Timeline;
