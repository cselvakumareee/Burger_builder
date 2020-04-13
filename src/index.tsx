import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import BurgerBuilderReducer from './Store/Reducer/BurgerBuilderReducer';
import OrderReducer from './Store/Reducer/OrderReducer';
import AuthReducer from './Store/Reducer/AuthReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  BurgerBuilder: BurgerBuilderReducer,
  Order: OrderReducer,
  Auth: AuthReducer
});

//Note: its is simple middleware
const logger = (store:any) => {
  return (next:any) =>{
     return (action:any) =>{
         //console.log('[Middleware] Dispatching', action);
         const result = next(action);
         //console.log('[Middleware] next state', store.getState());
         return result;
     }
  }
};


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
  <BrowserRouter>
  <App />
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
