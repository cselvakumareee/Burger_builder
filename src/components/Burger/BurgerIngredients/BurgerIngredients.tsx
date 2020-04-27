import React, { Component } from "react";
import PropTypes from "prop-types";
import "./BurgerIngredients.scss";

const BurgerIngredients = (props: any) => {
  let ingredient = null;
  switch (props.type) {
    case "bread-bottom":
      ingredient = <div className="BreadBottom"></div>;
      break;
    case "bread-top":
      ingredient = (
        <div className="BreadTop">
          <div className="seeds1"></div>
          <div className="seeds2"></div>
        </div>
      );
      break;
    case "meat":
      ingredient = <div className="Meat"></div>;
      break;

    case "cheese":
      ingredient = <div className="Cheese"></div>;
      break;

    case "salad":
      ingredient = <div className="Salad"></div>;
      break;

    case "bacon":
      ingredient = <div className="Bacon"></div>;
      break;

    default:
      ingredient = null;
  }

  return ingredient;
};

// BurgerIngredients.PropTypes = {
//     type : PropTypes.string.isRequired
//  };

export default BurgerIngredients;
