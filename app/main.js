import React from 'react';
import Router from 'react-router';
import ReactDOM from 'react-dom';

import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './routes';

// createBrowserHistory enables HTML5 History API in order to make URLs look pretty
// e.g. http://localhost:3000/add instead of http://localhost:3000/#add
let history = createBrowserHistory();

ReactDOM.render(
    <Router history={history}>{routes}</Router>,
    document.getElementById('app')
);
