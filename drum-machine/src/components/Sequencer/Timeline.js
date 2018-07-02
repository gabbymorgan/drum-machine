

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
    this.state = {
      time: this.props.time
    };
  }
  render() {
    return (
      <LedContainer>
        <Led id="0" active={this.state.time === 0} />
        <Led id="1" active={this.state.time === 1} />
        <Led id="2" active={this.state.time === 2} />
        <Led id="3" active={this.state.time === 3} />
        <Led id="4" active={this.state.time === 4} />
        <Led id="5" active={this.state.time === 5} />
        <Led id="6" active={this.state.time === 6} />
        <Led id="7" active={this.state.time === 7} />
        <Led id="8" active={this.state.time === 8} />
        <Led id="9" active={this.state.time === 9} />
        <Led id="10" active={this.state.time === 10} />
        <Led id="11" active={this.state.time === 11} />
        <Led id="12" active={this.state.time === 12} />
        <Led id="13" active={this.state.time === 13} />
        <Led id="14" active={this.state.time === 14} />
        <Led id="15" active={this.state.time === 15} />
      </LedContainer>
    );
  }
}

export default Timeline;
