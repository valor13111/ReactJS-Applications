import React, { Component } from 'react';

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
    }
  }

  render() {
    return (
      <div>
        <div className="Stopwatch-hours">{this.state.hours} Hours</div>
        <div className="Stopwatch-minutes">{this.state.minutes} Minutes</div>
        <div className="Stopwatch-seconds">{this.state.seconds} Seconds</div>
      </div>
    )
  }
}

export default Stopwatch;
