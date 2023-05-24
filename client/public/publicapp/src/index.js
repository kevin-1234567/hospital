import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import reducers from './reducer';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';

const store = createStore(reducers, applyMiddleware(thunk));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
