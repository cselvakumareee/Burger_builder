import * as actionTypes from '../Action/ActionTypes';
import { updateObject } from '../Utility';

const initialState:any = {
    // ingredients: {
    //     salad:'',
    //     bacon: '',
    //     cheese: '',
    //     meat: ''
    // },
    ingredients: null,
    totalPrice:4,
    error:false,
    building: false
}

const INGREDIENT_PRICES:any = {
    salad: 0.4,
    cheese: 0.5,
    meat: 1.3,
    bacon: 0.7,
};

const reducer = (state=initialState, action:any) =>{
   switch(action.type){
       case actionTypes.ADD_INGREDIENT:
           return{
               //Note: the below code help for cloning state
              ...state,
              //the below code help for deep cloning
              ingredients:{
                  ...state.ingredients,
                  // the below code will give salad : 0 + 1,
                  [action.ingredientName] : state.ingredients[action.ingredientName] + 1,
              },
              totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
              building: true
           };
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1,
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
            };
        case actionTypes.SET_INGREDIENTS:
            //Note Way1
            return{
               ...state,
               ingredients: action.ingredients,
               totalPrice: 4,
               error: false,
               building: false
            };

            //Note way2 By using utility
            // return updateObject(state,{
                
            //    ingredients: action.ingredients,
            //    totalPrice: 4,
            //    error: false
            // });
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                error: true
            }  
           // return updateObject(state, {error:true});      
        default:
            return state;    
   }
};

export default reducer;