import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../Checkout/contactData/ContactData";
import { Route } from "react-router-dom";

interface ICheckoutProps {
  history: any;
  location: any;
  match: any
}

class Checkout extends Component<ICheckoutProps, {}> {
  state = {
    ingredients: {
      salad: '',
      meat: '',
      cheese: '',
      bacon: ''
    },
    totalPrice:'',

  };
  componentDidMount() {
    const query: any = new URLSearchParams(this.props.location.search);
    const ingredients: any = {};
    for (let param of query.entries()) {
      
      //['salad','1']
      if(param[0] === 'price'){
          this.state.totalPrice = param[1];
      }
      else{
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients, totalPrice:this.state.totalPrice });
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route path={this.props.match.path+'/contact-data'} render={()=>(<ContactData {...this.props} ingredients={this.state.ingredients} price={this.state.totalPrice}/>)}/>
      </div>
    );
  }
}

export default Checkout;
