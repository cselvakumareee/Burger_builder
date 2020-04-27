import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../Checkout/contactData/ContactData";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as OrderActionCreator from "../../Store/Action/Index";

const Checkout = (props:any) => {
  const checkoutContinuedHandler = () => {
    props.history.replace("/checkout/contact-data");
  };
  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  let summary = <Redirect to="/" />;

  if (props.ings) {
    const purchaseRedirect = props.purchased ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {purchaseRedirect}
        <CheckoutSummary
          ingredients={props.ings}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />

        <Route
          path={props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
    return <div>{summary}</div>;
  
};

const mapStateToProps = (state: any) => {
  return {
    ings: state.BurgerBuilder.ingredients,
    purchased: state.Order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
