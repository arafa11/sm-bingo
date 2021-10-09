import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import ReactNotification from 'react-notifications-component'
import App from './App';
import store from './redux/store';
import "./assets/scss/styles.scss";
import 'react-notifications-component/dist/theme.css'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
    <ReactNotification />
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
