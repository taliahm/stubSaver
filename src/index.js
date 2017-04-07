import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';
import Recoms from './components/Recoms.js';
import './index.css';

ReactDOM.render(
	<Router history={browserHistory}>
 		<Route path="/" component={App} />
 		<Route path="/reco" component={Recoms} />
  </Router>,
  document.getElementById('root')
);
