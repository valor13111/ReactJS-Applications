import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true,
      timeElapsed: 0,
      laps: [],
      lastTimerId: null
    };

    /* this is a variable acting as the id for clearInterval */
    this.timerId = null;
  }

  /* formats the seconds into 00:00:00 format */
  formatSeconds = (sec) => {
    let minutesFloor = Math.floor(sec / 60);
    let hoursFloor = Math.floor(sec / 60 / 60);

    let seconds = ('0' + sec % 60).slice(-2);
    let minutes = ('0' + minutesFloor).slice(-2);
    let hours = ('0' + hoursFloor).slice(-2);

    return hours + ':' + minutes + ':' + seconds;
  }

  /* changes the state of toggle between true and false */
  toggle = () => {
    this.setState({
      toggle: !this.state.toggle
    })
  }

  /* adds 1 to the amount of time that has elapsed */
  add = () => {
    this.setState({
      timeElapsed: this.state.timeElapsed + 1
    });
  }

  /* sets the interval to perform add() function every 1 seconds */
  startTimer = () => {
    this.timerId = setInterval(() => {
      this.add();
    }, 1000);

    this.setState({
      lastTimerId: this.timerId
    });
  }

  /* pauses the timer by passing the incrementer variable in clearInterval */
  pauseTimer = () => {
    clearInterval(this.timerId);
  }

  /* if toggle is true, start the timer, else pause it.
     also calls toggle() function to change state of toggle */
  handleTimer = () => {
    if (this.state.toggle === true) {
      this.startTimer();
    } else {
      this.pauseTimer();
    }

    this.toggle();
  }

  /* this gets the current time elapsed and concatenates it with laps state */
  /* push didn't work, so I just made it concat with an array of time elapsed */
  retrieveLap = () => {
    this.setState({
      laps: this.state.laps.concat([this.state.timeElapsed])
    })
  }

  render() {
    return (
      <div>
        <Button onClick={() => this.handleTimer()}>
          Start/Stop
        </Button>

          <div className="Stopwatch-seconds">{ this.formatSeconds(this.state.timeElapsed) }</div>

        <Button onClick={() => this.retrieveLap()}>
          Lap
        </Button>

        <div>
        { this.state.laps.map((lap, i) => {
          return <li lap={this.state.laps}
                     key={i}
                 >
            Lap { i + 1 } / { this.formatSeconds(lap) }
          </li>
          })
        }
        </div>
      </div>
    )
  }
}

export default Stopwatch;
