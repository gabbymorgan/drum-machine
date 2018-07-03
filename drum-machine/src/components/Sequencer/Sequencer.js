import React from "react";
import { Container, Row, Col } from "reactstrap";
import Sequence from "./Sequence";
import Timeline from "./Timeline";
import { kick, snare, hhopen, hhclosed, tom1, tom2, aux1, aux2 } from '../../sounds'

const sounds = {
  kick, snare, hhopen, hhclosed, tom1, tom2, aux1, aux2
}

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
        {Object.keys(sounds).map((name, index) => {
          return <Sequence
          name={name}
          sound={sounds[name]}
          context={this.props.context}
          currentBeat={this.props.currentBeat}
          sequenceLength={this.props.sequenceLength}
          />
        })}
      </Container>
    );
  }
}

export default Sequencer;
