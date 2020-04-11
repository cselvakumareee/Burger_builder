import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../Checkout/contactData/ContactData";
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import * as OrderActionCreator from '../../Store/Action/Index';

interface ICheckoutProps {
  history: any;
  location: any;
  match: any,
  ings:any,
  //onInitPurchase: any,
  purchased: any
}

class Checkout extends Component<ICheckoutProps, {}> {
  // state = {
  //   ingredients: {
  //     salad: '',
  //     meat: '',
  //     cheese: '',
  //     bacon: ''
  //   },
  //   totalPrice:'',

  // };
  // componentDidMount() {
  //   const query: any = new URLSearchParams(this.props.location.search);
  //   const ingredients: any = {};
  //   for (let param of query.entries()) {
      
  //     //['salad','1']
  //     if(param[0] === 'price'){
  //         this.state.totalPrice = param[1];
  //     }
  //     else{
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   this.setState({ ingredients: ingredients, totalPrice:this.state.totalPrice });
  // }

  // componentDidMount(){
  //   this.props.onInitPurchase();
  // }

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  render() {
    let summary = <Redirect to="/" />
    
    if(this.props.ings){
      const purchaseRedirect = this.props.purchased ? <Redirect to = "/" /> : null;
      summary = <div>
        {purchaseRedirect}
      <CheckoutSummary
      ingredients={this.props.ings}
      checkoutCancelled={this.checkoutCancelledHandler}
      checkoutContinued={this.checkoutContinuedHandler}
    />
    {/* <Route path={this.props.match.path+'/contact-data'} render={()=>(<ContactData {...this.props} ingredients={this.state.ingredients} price={this.state.totalPrice}/>)}/> */}
    <Route path={this.props.match.path+'/contact-data'} component={ContactData}/>
    </div>
    }
    return (
      <div>
        {summary}
        
      </div>
    );
  }
}
const mapStateToProps = (state:any) => {
  return{
    ings: state.BurgerBuilder.ingredients,
    purchased: state.Order.purchased 
  };
};


export default connect(mapStateToProps)(Checkout);
