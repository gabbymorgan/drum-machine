import React from "react";
import { Container, Row, Col } from "reactstrap";
import Sequence from "./Sequence";
import Timeline from "./Timeline";

class Sequencer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.props.time
    };
  }

  render() {
    return (
      <Container>
        <Timeline time={this.state.time} />
        <Sequence />
        <Sequence />
        <Sequence />
        <Sequence />
        <Sequence />
        <Sequence />
        <Sequence />
        <Sequence />
      </Container>
    );
  }
}

export default Sequencer;
