import React from "react";
import { Container, Row, Col } from "reactstrap";
import Sequence from "./Sequence";
import Timeline from "./Timeline";
import styled from "styled-components";
import { kick, snare, hhopen, hhclosed, tom1, tom2, aux1, aux2 } from '../../sounds';

const sounds = {
  kick, snare, hhopen, hhclosed, tom1, tom2, aux1, aux2
}

const LedSpacer = styled.div`
  width: 100%;
  height: 10px;
`;

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
        <LedSpacer />
        <Timeline
          currentBeat={this.props.currentBeat}
          sequenceLength={this.props.sequenceLength}
        />
        <LedSpacer />
        {Object.keys(sounds).map((name, index) => {
          return (
            <Sequence
              name={name}
              playSound={sounds[name]}
              context={this.props.context}
              currentBeat={this.props.currentBeat}
              sequenceLength={this.props.sequenceLength}
              //needs to be passed sound function/file
            />
          );
        })}
      </Container>
    );
  }
}

export default Sequencer;
