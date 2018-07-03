import React from "react";
import { Container, Row, Col } from "reactstrap";
import Sample from "./Sample";
import styled from "styled-components";
import { kick, snare, hhopen, hhclosed, tom1, tom2, aux1, aux2 } from '../../sounds';

const sounds = {
  kick, snare, hhopen, hhclosed, tom1, tom2, aux1, aux2
}

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
            {Object.keys(sounds).slice(0,4).map(name =>{
              return <Sample
              name={name}
              playSound={sounds[name]}
              context={this.props.context}
              />
            })}
          </Row>
          <RowSpacer />
          <Row>
            {Object.keys(sounds).slice(4).map(name =>{
                return <Sample
                name={name}
                playSound={sounds[name]}
                context={this.props.context}
                />
              })}
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
