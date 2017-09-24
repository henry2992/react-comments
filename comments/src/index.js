import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'


ReactDOM.render(
  <Provider >
    <App />
  </Provider>,
  document.getElementById('root')
)

