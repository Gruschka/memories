import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import './index.css'
import reducers from './store/index';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
     document.getElementById('root')
);
