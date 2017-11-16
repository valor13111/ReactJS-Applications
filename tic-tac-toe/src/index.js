import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// This is a functional component, which is simpler to write.  It is used when 
// component types only consist of a render method.  Don't need to define a class
// extending React.Component, just write a function that takes props and returns
// what should be rendered.
function Square(props) {
	return (
		<button className="square" onClick={props.onClick}>
			{props.value}
		</button>
	);
}

// React component
// The renderSquare(i) returns a descr. of component Square, which sets value={i}
// In the Square class, in the render method, it returns with {this.props.value},
// where props is the param it takes in, and value is the name of the param from Board
class Board extends React.Component {
	
  // render a square, passing property of a value and onClick
  renderSquare(i) {
	    return (
	      <Square 
	        value={this.props.squares[i]}
	        onClick={() => this.props.onClick(i)}
	      />
	    );
	  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// React component
class Game extends React.Component {
	constructor() {
		super();
		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			stepNumber: 0,
			xIsNext: true,
		};
	}
	
  // handles the click when a square on game board is clicked
  // will also check to see if there is a winner, and if so, it doesn't allow clicking anymore
  handleClick(i) {
	  const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
	  
	  if (calculateWinner(squares) || squares[i]) {
		  return;
	  }
	  
	  // if squares[i] = this.state.xIsNext, return X, if not, then return O
	  squares[i] = this.state.xIsNext ? 'X' : 'O';
	  // set board state with squares again, and change boolean value of xIsNext
	  this.setState({
	      history: history.concat([{
	        squares: squares
	      }]),
	      stepNumber: history.length,
	      xIsNext: !this.state.xIsNext,
	    });
  }
  
  jumpTo(step) {
	  this.setState({
		  stepNumber: step,
		  xIsNext: (step % 2) == 0,
	  })
  }
	
  render() {
    const history = this.state.history;
	const current = history[this.state.stepNumber]; 
	const winner = calculateWinner(current.squares);
	
	const moves = history.map((step, move) => {
		const desc = move ?
				'Go to move #' + move :
				'Go to game start';
		return (
		        <li key={move}>
		          <button onClick={() => this.jumpTo(move)}>{desc}</button>
		        </li>
		      );
	});
	
	
	let status;
	if (winner) {
		status = 'Winner: ' + winner;
	} else {
		status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
	}
	  
    return (
      <div className="game">
        <div className="game-board">
          <Board 
          	squares={current.squares}
          	onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

//functional component to determine winner
function calculateWinner(squares) {
	// all the winning lines
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	
	// check through all possibilities of winning lines
	for(let i =0; i < lines.length; i++) {
		// let constant variable = a winning line
		const[a, b, c] = lines[i];
		// check to see if squares a, b, and c are the same, if so, return the
		// letter that won, either X or O
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}