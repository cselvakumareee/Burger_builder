import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import  AppConnect from './App'; //we stored app comp in Appconnect
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import BurgerBuilderReducer from './Store/Reducer/BurgerBuilderReducer';
import OrderReducer from './Store/Reducer/OrderReducer';
import AuthReducer from './Store/Reducer/AuthReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { watchAuth, watchBurgerBuilder, watchOrder } from './Store/Sagas/Index';

const rootReducer = combineReducers({
  BurgerBuilder: BurgerBuilderReducer,
  Order: OrderReducer,
  Auth: AuthReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, sagaMiddleware)));
sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrder);

const app = (
  <Provider store={store}>
  <BrowserRouter>
  <AppConnect />
  </BrowserRouter>
  </Provider>
);

ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
