import React, { Component } from "react";
import "./App.scss";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import withErrorHandler from "./hoc/withErrorHandler/withErrorHandler";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch } from "react-router-dom";
import Orders from './containers/Orders/Orders';

class App extends Component {
  // state={
  //   show:true
  // }
  //the below code used for checking remove interceptor is working in withErrorHandler.tsx
  // if its working we will get 0 in console
  // componentDidMount(){
  //   setTimeout(()=>{this.setState({show:false})},5000);
  // }
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
             <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
