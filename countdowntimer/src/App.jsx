import React, { Component } from 'react';
import './App.css';
import Clock from './Clock';
import Stopwatch from './Stopwatch';
import { Button, Form, FormControl } from 'react-bootstrap';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deadline: 'December 25, 2017',
			newDeadline: '',
			newHours: 0,
			newMinutes: 0,
			newSeconds: 0
		}
	}

	changeDeadline() {
		this.setState({
			deadline: this.state.newDeadline,
		})
	}

	render() {
		return (
			<div className="Container">
				<div className="App">
					<div className="App-title">Countdown to {this.state.deadline}</div>
					{/* deadline is getting passed down to Clock */}
					<Clock deadline = {this.state.deadline}/>
					<Form inline>
						<FormControl
							className="Deadline-input"
							placeholder='new date'
							onChange={event => this.setState({
								newDeadline: event.target.value,
							})}
						/>
						<Button onClick={() => this.changeDeadline()}>
							Submit
						</Button>
					</Form>
				</div>

				<div className="App">
					<div className="App-title">Stopwatch</div>
				 	<Stopwatch />
					Next, use concat for laps and create laps method
				</div>
			</div>

			// <div className="Stopwatch">
			// 	<div className="Stopwatch-title">Stop Watch</div>
			// 	<Stopwatch />
			// 	<Form inline>
			// 		<FormControl
			// 			className="Stopwatch-input"
			// 			placeholder='new timer'
			// 			onChange={event => this.setState({
			// 				timer: event.target.value,
			// 			})}
			// 		/>
			// 		<Button onClick={() => this.changeTimer()}>
			// 			Submit
			// 		</Button>
			// 	</Form>
			// </div>
		)
	}
}

export default App;
