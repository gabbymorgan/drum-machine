import React from 'react';
import styled from 'styled-components';

const Samp = styled.div`
  width: 20%;
  height: 100px;
  border: 1px solid black;
  background: #e0e0e0;
  border-radius: 5px;
  margin: 0 auto;
`;

class Sample extends React.Component {
  clickHandler() {
    this.props.playSound(this.props.context, this.props.gain);
  }

  render() {
    return <Samp onClick={() => this.clickHandler()} />;
  }
}

export default Sample;
