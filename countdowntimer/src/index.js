// allows us to use react and all its components from library
import React from 'react';
// controls actually throwing react onto the browser
import ReactDOM from 'react-dom';
// need to import from current directory, then App.jsx
import App from './App.jsx';

ReactDOM.render(
	<App />,
	document.getElementById('root')
);