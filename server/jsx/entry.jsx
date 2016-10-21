import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MainPage from './MainPage.jsx';
import PublicationRecord from './PublicationRecord.jsx';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
	<Router history = {browserHistory} >
		<Route path="/" component={MainPage}>
			<Route path="/user/:id" component={PublicationRecord}></Route>
		</Route>
	</Router>,
	document.getElementById('main')
);
