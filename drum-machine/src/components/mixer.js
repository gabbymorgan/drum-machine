import React, { Component } from 'react';
import styled from 'styled-components';

const MixerStyled = styled.div`
  input[type='range'] {
    -webkit-appearance: none;
    background-color: white;
  }

  input[type='range']:focus {
    outline: none;
  }

  input[type='range']::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 1px 1px 1px #000000;
    border-radius: 5px;
    border: 1px solid #000000;
  }

  input[type='range']::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px #000000;
    border: 1px solid #000000;
    height: 20px;
    width: 10px;
    border-radius: 0px;
    background: #00FF00;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -8px;
  }
`;

class Mixer extends Component {
  render() {
    return (
      <MixerStyled>
        Delay Volume:{' '}
        <input
          type="range"
          name="DelayVolume"
          onChange={this.props.delayHandler}
        />{' '}
        <br />
        Delay Time:{' '}
        <input
          type="range"
          name="DelayTime"
          onChange={this.props.delayHandler}
        />{' '}
        <br />
        Delay Feedback:{' '}
        <input
          type="range"
          name="DelayFeedback"
          onChange={this.props.delayHandler}
        />{' '}
        <br />
      </MixerStyled>
    );
  }
}

export default Mixer;
