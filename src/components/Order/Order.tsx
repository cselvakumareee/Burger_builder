import React from "react";
import "./Order.scss";

const Order = (props: any) => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }

  const ingredientOutput = ingredients.map(igkey => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px"
        }}
        key={igkey.name}
      >
        {igkey.name}({igkey.amount})
      </span>
    );
  });
  return (
    <div className="Order">
      <p>Ingredients: {ingredientOutput}</p>
      {/* Note: Below we are getting price value as string not a number, because we received value as json */}
      <p>
        price: <strong>{Number.parseFloat(props.price).toFixed(2)} USD</strong>
      </p>
    </div>
  );
};

export default Order;
