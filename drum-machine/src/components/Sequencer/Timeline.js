import React from "react";
import styled from "styled-components";

const LedContainer = styled.div`
  display: flex;
`;

const Led = styled.div`
  height: 20px;
  width: 5%;
  border: 1px solid black;
  border-radius: 5px;
  background: ${props => (props.active ? "#76ff03" : "#e0e0e0")};
  margin: 0 auto;
`;

class Timeline extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <LedContainer>
        {[...Array(this.props.sequenceLength).keys()].map((value, index) => {
          return <Led id={index} active={this.props.currentBeat === index} />;
        })}
      </LedContainer>
    );
  }
}

export default Timeline;
