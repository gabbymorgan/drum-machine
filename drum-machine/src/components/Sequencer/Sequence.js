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
      noteOn: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };
  }

  handleClick = event => {
    let noteArr = this.state.noteOn;
    console.log(event.target);
  };

  render() {
    return (
      <LedContainer>
        <Led id="0" on={this.state.noteOn[0]} onClick={this.handleClick} />
        <Led id="1" on={this.state.noteOn[1]} onClick={this.handleClick} />
        <Led id="2" on={this.state.noteOn[2]} onClick={this.handleClick} />
        <Led id="3" on={this.state.noteOn[3]} onClick={this.handleClick} />
        <Led id="4" on={this.state.noteOn[4]} onClick={this.handleClick} />
        <Led id="5" on={this.state.noteOn[5]} onClick={this.handleClick} />
        <Led id="6" on={this.state.noteOn[6]} onClick={this.handleClick} />
        <Led id="7" on={this.state.noteOn[7]} onClick={this.handleClick} />
        <Led id="8" on={this.state.noteOn[8]} onClick={this.handleClick} />
        <Led id="9" on={this.state.noteOn[9]} onClick={this.handleClick} />
        <Led id="10" on={this.state.noteOn[10]} onClick={this.handleClick} />
        <Led id="11" on={this.state.noteOn[11]} onClick={this.handleClick} />
        <Led id="12" on={this.state.noteOn[12]} onClick={this.handleClick} />
        <Led id="13" on={this.state.noteOn[13]} onClick={this.handleClick} />
        <Led id="14" on={this.state.noteOn[14]} onClick={this.handleClick} />
        <Led id="15" on={this.state.noteOn[15]} onClick={this.handleClick} />
      </LedContainer>
    );
  }
}

export default Timeline;
