import React, { Component } from "react";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

interface IorderSummaryProps {
  ingredients: any;
  price: any;
  purchaseCancelled: any;
  purchaseContinued: any;
}

class orderSummary extends Component<IorderSummaryProps, {}> {
   componentDidUpdate(){
     console.log('ordersummary');
   }

  render() {
    
    const ingredients = this.props.ingredients;
    const ingrdientsToShow = Object.keys(ingredients).map(igkey => {
      return (
        <li key={igkey}>
          <span style={{ textTransform: "capitalize" }}>{igkey}</span>:
          {ingredients[igkey]}
        </li>
      );
    });
    return (
      <Auxiliary>
        <h3>Your order</h3>
        <p>A deliciour burger with following ingrdients:</p>
        <ul>{ingrdientsToShow}</ul>
        <p>
          <strong>Total price:{this.props.price.toFixed(2)}</strong>
        </p>
        <p>continue to checkout</p>

        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Auxiliary>
    );
  }
}

export default orderSummary;
