import React, { useEffect, Suspense } from "react";
import "./App.scss";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import withErrorHandler from "./hoc/withErrorHandler/withErrorHandler";

import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import { compose } from "redux";
import * as AuthActionCreator from "./Store/Action/Index";

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});


const App = (props:any) => {
  useEffect(()=>{
    props.onTryAutoSignup();
  },[])
  
  return (
      <div className="App">
        <Layout>
          <Suspense fallback={<p>Loading...</p>}>         
            <Switch>
             <Route path="/checkout" render={(props:any)=> <Checkout {...props}/>} />
            <Route path="/orders" render={(props:any)=> <Orders {...props}/>} />
            <Route path="/auth" render={(props:any)=><Auth {...props}/>} />
            <Route path= "/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch> 
          </Suspense>

        </Layout>
      </div>
    );
  
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
const AppConnect = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App)
);

export default AppConnect;
