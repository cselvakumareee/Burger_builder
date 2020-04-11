import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import { any, object } from "prop-types";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from 'react-redux';
import * as BurgerBuilderActionCreators from '../../Store/Action/Index';


interface IBurgerBuilderProps {
  match: any;
  history: any,
  ings: any,
  onIngredientAdded:any,
  onIngredientRemoved:any,
  onInitIngredients: any,
  onInitPurchased: any,
  price:any,
  error:any
}

class BurgerBuilder extends Component<IBurgerBuilderProps, {}> {
  constructor(props: any) {
    super(props);
  }

  state = {
    // ingredients: {
    //   salad: "",
    //   bacon: "",
    //   cheese: "",
    //   meat: "",
    // },
    //ingredients: null,
   // totalPrice: 4,
   // purchaseable: false,
    purchasing: false, //Local UI State
    //loading: false, //Local UI State
    //error: false, //Local UI State
    queryParams: [],
  };

  componentDidMount() {
    console.log("burgerbuilder" + this.props.match.history);
    this.props.onInitIngredients();
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: true,
    });
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false,
    });
  };

  purchaseContinueHandler = () => {
    //Note: convert state ingredients to query search -- important
    // let queryParamsFinal: any = this.state.queryParams;
    // let stateIngredients: any = { ...this.props.ings };
    // for (let i in stateIngredients) {
    //   queryParamsFinal.push(
    //     encodeURIComponent(i) + "=" + encodeURIComponent(stateIngredients[i])
    //   );
    // }
    // queryParamsFinal.push("price=" + this.props.price.toFixed(2));
    // let queryString = queryParamsFinal.join("&");
    // this.props.history.push({
    //   pathname: "/checkout",
    //   search: "?" + queryString,
    // });
    this.props.onInitPurchased();
    this.props.history.push('/checkout');
  };

  updatePurchaseState = (ingredients: any) => {
    const ingredientFinal: any = ingredients;

    const sum = Object.keys(ingredientFinal)
      .map((igkey) => {
        return ingredientFinal[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

   
      return sum > 0
    
  };

  // addIngredientHandler = (type: any) => {
  //   const oldCount: any = { ...this.state.ingredients };
  //   console.log(oldCount[type]);
  //   const oldCountValueAdded = oldCount[type];
  //   const updatedCount = oldCountValueAdded + 1;
  //   console.log("updatedcount" + updatedCount);
  //   const updatedIngredients: any = {
  //     ...this.state.ingredients,
  //   };
  //   console.log("updated ingredients" + updatedIngredients);
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition: any = { ...INGREDIENT_PRICES };

  //   const priceAdditionValueAdded: any = priceAddition[type];
  //   console.log("priceadditiontype" + priceAddition[type]);
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAdditionValueAdded;
  //   this.setState({
  //     totalPrice: newPrice,
  //     ingredients: updatedIngredients,
  //   });
  //   this.updatePurchaseState(updatedIngredients);
  // };
  // removeIngredientHandler = (type: any) => {
  //   const oldCount: any = { ...this.state.ingredients };
  //   console.log(oldCount[type]);
  //   const oldCountValueAdded = oldCount[type];
  //   if (oldCountValueAdded <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCountValueAdded - 1;
  //   const updatedIngredients: any = {
  //     ...this.state.ingredients,
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition: any = { ...INGREDIENT_PRICES };
  //   const priceAdditionValueAdded: any = priceAddition[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceAdditionValueAdded;
  //   this.setState({
  //     totalPrice: newPrice,
  //     ingredients: updatedIngredients,
  //   });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };

    const disabledInfoFinal: any = disabledInfo;

    for (let key in disabledInfoFinal) {
      disabledInfoFinal[key] = disabledInfoFinal[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.props.error ? (
      <p>Ingredients cant be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ings} />
          <BuildControls
          //Note: the below code we are sending payload(ingName) from buildcontrols.tsx
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfoFinal}
            price={this.props.price}
            //Note: the below code will give either true or false, ex function() it will execute immidiately
            // It wont wait for any click function & finally pass props to child comp
            purchaseable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Auxiliary>
      );

      orderSummary = (
        <OrderSummary
          price={this.props.price}
          purchaseContinued={this.purchaseContinueHandler}
          purchaseCancelled={this.purchaseCancelHandler}
          ingredients={this.props.ings}
        />
      );
    }
    // if (this.state.loading) {
    //   orderSummary = <Spinner />;
    // }

    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

const mapStateToProps = (state:any) =>{
  console.log(state);
  return{
    ings: state.BurgerBuilder.ingredients,
    price: state.BurgerBuilder.totalPrice,
    error: state.BurgerBuilder.error
  }
};

const mapDispatchToProps = (dispatch:any) => {
  return{
    onIngredientAdded: (ingName:any)=> dispatch(BurgerBuilderActionCreators.addIngredient(ingName)),
    onIngredientRemoved: (ingName:any)=> dispatch(BurgerBuilderActionCreators.removeIngredient(ingName)),
    onInitIngredients: ()=> dispatch(BurgerBuilderActionCreators.initIngredients()),
    onInitPurchased: ()=> dispatch(BurgerBuilderActionCreators.purchaseInit()) //Note: purchaseInit comes from orderActionCreator
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
