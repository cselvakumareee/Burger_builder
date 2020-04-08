import * as actionTypes from './Action';

const initialState:any = {
    ingredients: {
        salad:0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice:4
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
              totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
           };
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1,
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        default:
            return state;    
   }
};

export default reducer;