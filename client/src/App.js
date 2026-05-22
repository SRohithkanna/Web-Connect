import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <h1>DevConnector App</h1>
        </div>
      </Router>
    </Provider>
  );
};

export default App;