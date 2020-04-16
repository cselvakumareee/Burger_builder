import * as actionTypes from './ActionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingName:any) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName
  };
};

export const removeIngredient = (ingName:any) => {
    return {
      type: actionTypes.REMOVE_INGREDIENT,
      ingredientName: ingName
    };
};
  
export const setIngredients = (ingredients:any) =>{
  return{
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

export const initIngredients = () => {
  return {
    type: actionTypes.INIT_INGREDIENTS
  }
  // return (dispatch:any) =>{
  //   axios.get("/ingredients.json").then(response =>{
      
  //       dispatch(setIngredients(response.data));
  //      }).catch(error =>{
  //        dispatch(fetchIngredientsFailed());
  //      })    
  // };
};