// import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { combineReducers, createStore } from 'redux';
import rollingReducer from './store/reducers/rolling.js';
import payingReducer from './store/reducers/paying.js';
import { Provider } from 'react-redux';

const rootReducer = combineReducers({
  rolling: rollingReducer,
  payingg: payingReducer,
})

const store = createStore(rootReducer);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    app
  // </React.StrictMode>,
)
