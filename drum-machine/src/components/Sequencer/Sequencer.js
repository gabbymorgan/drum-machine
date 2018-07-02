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
        <Timeline currentBeat={this.props.currentBeat} 
        sequenceLength={this.props.sequenceLength}
        />
        {[...Array(this.props.tracks).keys()].map((value, index) => {
          return <Sequence currentBeat={this.props.currentBeat}
          sequenceLength={this.props.sequenceLength}
          //needs to be passed sound function/file
          />
        })}
      </Container>
    );
  }
}

export default Sequencer;
