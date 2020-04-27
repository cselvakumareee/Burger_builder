import React, { Component } from "react";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

const orderSummary = (props:any) =>{
   
    const ingredients = props.ingredients;
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
          <strong>Total price:{props.price.toFixed(2)}</strong>
        </p>
        <p>continue to checkout</p>

        <Button btnType="Danger" clicked={props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={props.purchaseContinued}>
          CONTINUE
        </Button>
      </Auxiliary>
    );
  
}

export default orderSummary;
