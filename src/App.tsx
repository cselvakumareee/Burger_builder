import React, { Component } from "react";
import "./App.scss";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import withErrorHandler from "./hoc/withErrorHandler/withErrorHandler";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import { compose } from "redux";
import * as AuthActionCreator from "./Store/Action/Index";

interface IAppProps {
  onTryAutoSignup: any;
  isAuthenticated: any;
}

class App extends React.Component<IAppProps, {}> {
  constructor(props: any) {
    super(props);
  }
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  // state={
  //   show:true
  // }
  //the below code used for checking remove interceptor is working in withErrorHandler.tsx
  // if its working we will get 0 in console
  // componentDidMount(){
  //   setTimeout(()=>{this.setState({show:false})},5000);
  // }
  render() {
    // let routes = (
    //   <Switch>
    //     <Route path="/auth" component={Auth} />
    //     <Route path="/" exact component={BurgerBuilder} />
        
    //   </Switch>
    // );
    // if (this.props.isAuthenticated) {
    //   routes = (
    //     <Switch>
    //       <Route path="/checkout" component={Checkout} />
    //       <Route path="/orders" component={Orders} />
    //       <Route path="/logout" component={Logout} />
    //       <Route path="/" exact component={BurgerBuilder} />
          
    //     </Switch>
    //   );
    //   }
      
    return (
      <div className="App">
        <Layout>
         <Switch>
             <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path= "/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch> 
          
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.Auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onTryAutoSignup: () => dispatch(AuthActionCreator.authCheckState()),
  };
};
//Here we want to wrap our app comp with withRouter and connect, If you are connecting withrouter you cant able to pass props
const AppConnect = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App)
);

export default AppConnect;
