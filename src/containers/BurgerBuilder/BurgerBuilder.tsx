import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import { any, object } from "prop-types";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.4,
  cheese: 0.5,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  constructor(props: any) {
    super(props);
  }

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  };

  purchaseContinueHandler = () => {
    //alert("you continue");
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer:{
        name: 'selvakumar Chinnappan',
        address:{
          street:'99 anna nagar',
          zipcode:'620022',
          country: 'India'
        },
        email:'cselvakumareee@gmail.com'
      },
      deliveryMethod:'fastest'
    }
    axios.post('/orders',order)
    .then(response=>{
      console.log(response);
      this.setState({loading:false,purchasing:false});
    }).catch(error => {
      console.log(error);
      this.setState({loading:false,purchasing:false});
    });
  };

  updatePurchaseState = (ingredients: any) => {
    const ingredientFinal: any = ingredients;

    const sum = Object.keys(ingredientFinal)
      .map(igkey => {
        return ingredientFinal[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({
      purchaseable: sum > 0
    });
  };

  addIngredientHandler = (type: any) => {
    const oldCount: any = { ...this.state.ingredients };
    console.log(oldCount[type]);
    const oldCountValueAdded = oldCount[type];
    const updatedCount = oldCountValueAdded + 1;
    console.log("updatedcount" + updatedCount);
    const updatedIngredients: any = {
      ...this.state.ingredients
    };
    console.log("updated ingredients" + updatedIngredients);
    updatedIngredients[type] = updatedCount;
    const priceAddition: any = { ...INGREDIENT_PRICES };

    const priceAdditionValueAdded: any = priceAddition[type];
    console.log("priceadditiontype" + priceAddition[type]);
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAdditionValueAdded;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  };
  removeIngredientHandler = (type: any) => {
    const oldCount: any = { ...this.state.ingredients };
    console.log(oldCount[type]);
    const oldCountValueAdded = oldCount[type];
    if (oldCountValueAdded <= 0) {
      return;
    }
    const updatedCount = oldCountValueAdded - 1;
    const updatedIngredients: any = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition: any = { ...INGREDIENT_PRICES };
    const priceAdditionValueAdded: any = priceAddition[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAdditionValueAdded;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    const disabledInfoFinal: any = disabledInfo;

    for (let key in disabledInfoFinal) {
      disabledInfoFinal[key] = disabledInfoFinal[key] <= 0;
    }

    let orderSummary = <OrderSummary
    price={this.state.totalPrice}
    purchaseContinued={this.purchaseContinueHandler}
    purchaseCancelled={this.purchaseCancelHandler}
    ingredients={this.state.ingredients}
  />;
    
    if(this.state.loading){
      orderSummary = <Spinner />
    }

    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfoFinal}
          price={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
          ordered={this.purchaseHandler}
        />
      </Auxiliary>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
