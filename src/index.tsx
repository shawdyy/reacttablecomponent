import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ReactTableComponent from './ReactTableComponent';

ReactDOM.render(
  <React.StrictMode>
    <div>
      <h1>React Table Component</h1>
      <ReactTableComponent />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);