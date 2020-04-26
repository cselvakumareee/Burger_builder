import React, { useState, useEffect } from "react";
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

const BurgerBuilder = (props:any) =>  {
  const [purchasing, setPurchasing]:any = useState(false);
 
  useEffect(()=>{
    props.onInitIngredients();
  },[]);

  const purchaseHandler = () => {
    if(props.isAuthenticated){
      setPurchasing(true);
    }
    else{
      props.onSetAuthRedirectPath('/checkout');
      props.history.push("/auth");
    }
    
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchased();
    props.history.push('/checkout');
  };

  const updatePurchaseState = (ingredients: any) => {
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

    const disabledInfo = {
      ...props.ings,
    };

    const disabledInfoFinal: any = disabledInfo;

    for (let key in disabledInfoFinal) {
      disabledInfoFinal[key] = disabledInfoFinal[key] <= 0;
    } 

    let orderSummary = null;

    let burger = props.error ? (
      <p>Ingredients cant be loaded</p>
    ) : (
      <Spinner />
    );
    if (props.ings) {
      burger = (
        <Auxiliary>
          <Burger ingredients={props.ings} />
          <BuildControls
          //Note: the below code we are sending payload(ingName) from buildcontrols.tsx
            ingredientAdded={props.onIngredientAdded}
            ingredientRemoved={props.onIngredientRemoved}
            disabled={disabledInfoFinal}
            price={props.price}
            //Note: the below code will give either true or false, ex function() it will execute immidiately
            // It wont wait for any click function & finally pass props to child comp
            purchaseable={updatePurchaseState(props.ings)}
            ordered={purchaseHandler}
            isAuth = {props.isAuthenticated}
          />
        </Auxiliary>
      );

      orderSummary = (
        <OrderSummary
          price={props.price}
          purchaseContinued={purchaseContinueHandler}
          purchaseCancelled={purchaseCancelHandler}
          ingredients={props.ings}
        />
      );
    }

    return (
      <Auxiliary>
        <Modal
          show={purchasing}
          modalClosed={purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  
}

const mapStateToProps = (state:any) =>{
  console.log(state);
  return{
    ings: state.BurgerBuilder.ingredients,
    price: state.BurgerBuilder.totalPrice,
    error: state.BurgerBuilder.error,
    isAuthenticated: state.Auth.token !== null
  }
};

const mapDispatchToProps = (dispatch:any) => {
  return {
    onIngredientAdded: (ingName:any)=> dispatch(BurgerBuilderActionCreators.addIngredient(ingName)),
    onIngredientRemoved: (ingName:any)=> dispatch(BurgerBuilderActionCreators.removeIngredient(ingName)),
    onInitIngredients: ()=> dispatch(BurgerBuilderActionCreators.initIngredients()),
    onInitPurchased: ()=> dispatch(BurgerBuilderActionCreators.purchaseInit()), //Note: purchaseInit comes from orderActionCreator
    onSetAuthRedirectPath: (path:any) => dispatch(BurgerBuilderActionCreators.setAuthRedirectPath(path)) //Note: here its comes from auth action creator
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
