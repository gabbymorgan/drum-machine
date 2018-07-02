import React from "react";
import { Container, Row, Col, Button } from "reactstrap";

class Sequencer extends React.Component {
  state = {
    beatMap: [...Array(32).keys()].fill(0)
  };

  render() {
    return (
      <Container>
        <Row>
          <Col xs="1" />
          <Col xs="10">
            {this.state.beatMap.map(beat => {
              return <Button />;
            })}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Sequencer;
