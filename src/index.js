import './main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';  // для удобного debug
import thunk from 'redux-thunk'; // для ассинхронных запросов
import {syncHistoryWithStore} from 'react-router-redux';
import {Router, Route, browserHistory} from 'react-router';
import {Provider} from 'react-redux';

import reducers from 'reducers';
import Layout from 'containers/layout';
import Parts from 'containers/parts';
import Part from 'containers/part';

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk)
));

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route component={Layout}> // стандарная обертка вокруг любой страницы, содержит место для content и sidebar
                <Route path='/' component={Parts} />
                <Route path='categories/:id' component={Parts} />
            </Route>
            <Route path='parts/:id' component={Part} />
        </Router>
    </Provider>,
    document.getElementById('root')
);
