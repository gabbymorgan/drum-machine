import React from "react";
import styled from "styled-components";
import { kick, snare, hhopen, hhclosed, tom1, tom2, aux1, aux2 } from '../../sounds';


const Samp = styled.div`
  width: 20%;
  height: 100px;
  border: 1px solid black;
  background: #e0e0e0;
  border-radius: 5px;
  margin: 0 auto;
`;

class Sample extends React.Component {
  constructor(props) {
    super(props);
  }

  clickHandler() {
    this.props.playSound(this.props.context);
  }

  render() {
    return <Samp onClick={() => this.clickHandler()} />;
  }
}

export default Sample;
