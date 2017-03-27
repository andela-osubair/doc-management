/* eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import { Router, browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import configureStore from './store/configureStore';
import routes from './routes';
import './styles/style.css'; // Webpack can import CSS files too!
import '../node_modules/materialize-css/dist/js/materialize.min.js';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/material-icons/css/material-icons.css';
import '../node_modules/toastr/build/toastr.min.css';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/userActions';
import { loadUserDocument } from './actions/documentActions';


const store = configureStore();

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  axios.defaults.headers.common.Authorization = localStorage.jwtToken;
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  store.dispatch(loadUserDocument());
}

render(
<Provider store={store}>
    <Router history={browserHistory} routes={routes} />
</Provider>,
  document.getElementById('app')
);
