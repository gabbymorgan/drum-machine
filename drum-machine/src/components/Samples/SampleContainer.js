import React from "react";
import { Container, Row, Col } from "reactstrap";
import Sample from "./Sample";
import styled from "styled-components";

const RowSpacer = styled.div`
  height: 30px;
`;

class SampleContainer extends React.Component {
  constructor(props) {
    super(props);
    // console.log("SAMPLE CONTAINER PROPS", this.props);
  }

  render() {
    if (this.props.show) {
      return (
        <Container>
          <RowSpacer />
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
          <RowSpacer />
        </Container>
      );
    } else {
      return null;
    }
  }
}

export default SampleContainer;
