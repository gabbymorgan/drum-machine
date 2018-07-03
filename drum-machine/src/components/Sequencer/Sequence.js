import React from "react";
import { Row, Col } from 'reactstrap';
import styled from "styled-components";

const LedContainer = styled.div`
  display: flex;
`;

const Led = styled.div`
  height: 60px;
  width: ${props => (props.width)}%;
  margin: .5%;
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

  componentDidUpdate() {
    if (this.state.noteOn[this.props.currentBeat]) {
      this.props.sound(this.props.context);
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
    console.log(noteOn);
    this.setState({
      noteOn,
    });
  };

  render() {
    return (
      <Row>
        <Col>
          {this.props.name}
        </Col>
        <Col xs='10'>
          <LedContainer>
            {this.state.noteOn.map((note, index) => {
              return <Led 
              id={index} 
              on={this.state.noteOn[index]} 
              width={100/this.props.sequenceLength}
              onClick={() => this.handleClick(index)} 
              />
            })}
          </LedContainer>
        </Col>
      </Row>
    );
  }
}

export default Timeline;
