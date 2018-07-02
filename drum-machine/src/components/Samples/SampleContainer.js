import React from "react";
import { Container, Row, Col } from "reactstrap";
import Sample from "./Sample";
import styled from "styled-components";

const RowSpacer = styled.div`
  height: 30px;
`;

class SampleContainer extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Sample />
          <Sample />
          <Sample />
          <Sample />
        </Row>
        <RowSpacer />
        <Row>
          <Sample />
          <Sample />
          <Sample />
          <Sample />
        </Row>
      </Container>
    );
  }
}

export default SampleContainer;
