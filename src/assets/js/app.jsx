import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * from '@jest/globals'

const reactAppContainer = document.getElementById('react-app');

if (reactAppContainer) {
  ReactDOM.render(<App />, reactAppContainer);
}
