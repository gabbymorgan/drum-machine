

import React from "react";
import { Row, Col } from 'reactstrap';
import styled from "styled-components";

const LedContainer = styled.div`
  display: flex;
`;

const Led = styled.div`
  height: 20px;
  width: ${props => (props.width)}%;
  border: 1px solid black;
  border-radius: 5px;
  background: ${props => (props.active ? "#76ff03" : "#e0e0e0")};
  margin: .5%;
`;

class Timeline extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Row>
        <Col>
        </Col>
        <Col xs='10'>
          <LedContainer>
            {[...Array(this.props.sequenceLength).keys()].map((value, index) => {
              return <Led 
              id={index} 
              width={100/this.props.sequenceLength}
              active={this.props.currentBeat === index} />
            })}
          </LedContainer>
        </Col>
      </Row>
    );
  }
}

export default Timeline;
