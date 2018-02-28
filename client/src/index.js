import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import App from './js/App';
import registerServiceWorker from './js/registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
      <App/>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
