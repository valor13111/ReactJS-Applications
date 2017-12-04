import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

const formattedSeconds = (sec) => Math.floor(sec / 60 / 60) + ':' + Math.floor('0' + sec / 60) + ':' + ('0' + sec % 60).slice(-2);

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true,
      timeElapsed: 0,
      lastClearedIncrementer: null
    };

    this.incrementer = null;
  }

  formatSeconds = (sec) => {
    let minutesFloor = Math.floor(sec / 60);
    let hoursFloor = Math.floor(sec / 60 / 60);

    let seconds = ('0' + sec % 60).slice(-2);
    let minutes = ('0' + minutesFloor).slice(-2);
    let hours = ('0' + hoursFloor).slice(-2);

    return hours + ':' + minutes + ':' + seconds;
  }

  toggle = () => {
    this.setState({
      toggle: !this.state.toggle
    })
  }

  add = () => {
    this.setState({
      timeElapsed: this.state.timeElapsed + 1
    });
  }

  startTimer = () => {
    this.incrementer = setInterval(() => {
      this.add();
    }, 1000);

    this.setState({
      lastClearedIncrementer: this.incrementer
    });
  }

  pauseTimer = () => {
    clearInterval(this.incrementer);
  }

  handleTimer = () => {
    if (this.state.toggle === true) {
      this.startTimer();
    } else {
      this.pauseTimer();
    }

    this.toggle();
  }

  render() {
    return (
      <div>
      <Button onClick={() => this.handleTimer()}>
        Start/Stop
      </Button>
        <div className="Stopwatch-seconds">{ this.formatSeconds(this.state.timeElapsed) }</div>
      </div>
    )
  }
}

export default Stopwatch;
