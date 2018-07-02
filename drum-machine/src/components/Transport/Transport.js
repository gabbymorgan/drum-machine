import React from "react";
import { Input, Row, Col } from "reactstrap";

class Transport extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Row>
        <Col xs="1">
          <Input
            name="bpm"
            placeholder="100"
            onSubmit={() => this.props.changeBPM()}
          />
        </Col>
      </Row>
    );
  }
}

export default Transport;
