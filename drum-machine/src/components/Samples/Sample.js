import React from "react";
import styled from "styled-components";

const Samp = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  background: #e0e0e0;
  border-radius: 5px;
`;

class Sample extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Samp />;
  }
}

export default Sample;
