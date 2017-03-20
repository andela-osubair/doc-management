/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import './styles/style.css'; //Webpack can import CSS files too!
import '../node_modules/materialize-css/dist/js/materialize.min.js';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/material-icons/css/material-icons.css';
import '../node_modules/toastr/build/toastr.min.css';

const store = configureStore();

render(
<Provider store={store}>
    <Router history={browserHistory} routes={routes} />
</Provider>,
  document.getElementById('app')
);
