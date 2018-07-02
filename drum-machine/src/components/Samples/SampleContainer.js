import React from "react";
import { Container, Row, Col } from "reactstrap";
import Sample from "./Sample";
import styled from "styled-components";

const RowSpacer = styled.div`
  height: 30px;
`;

class SampleContainer extends React.Component {
  state = {
    samples: []
  };
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Sample />
          </Col>
          <Col>
            <Sample />
          </Col>
          <Col>
            <Sample />
          </Col>
          <Col>
            <Sample />
          </Col>
        </Row>
        <RowSpacer />
        <Row>
          <Col>
            <Sample />
          </Col>
          <Col>
            <Sample />
          </Col>
          <Col>
            <Sample />
          </Col>
          <Col>
            <Sample />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SampleContainer;
