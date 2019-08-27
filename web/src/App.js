import React from 'react';
import { Provider } from 'react-redux';
import AppReducer from "./reducers/app";
import { createStore, applyMiddleware, compose } from 'redux';
import Routes from './routes';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  AppReducer, composeEnhancers(applyMiddleware(thunk))
)

function App() {
  return (
    <Provider store= {store}>
      <Routes />
    </Provider>
  );
}

export default App;
