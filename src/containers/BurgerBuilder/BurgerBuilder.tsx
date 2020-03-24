import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


const INGREDIENT_PRICES = {
    salad: 0.4,
    cheese: 0.5,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    constructor(props:any){
      super(props);
    }

    state = {
        ingredients:{
            salad:0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    }

    addIngredientHandler = (type:any) => {
       const oldCount:any = {...this.state.ingredients};
       console.log(oldCount[type]);
       const oldCountValueAdded = oldCount[type]
       const updatedCount = oldCountValueAdded + 1;
       const updatedIngredients:any = {
           ...this.state.ingredients
       };
       updatedIngredients[type] = updatedCount;
       const priceAddition:any = {...INGREDIENT_PRICES};
       const priceAdditionValueAdded:any = priceAddition[type];
       const oldPrice = this.state.totalPrice;
       const newPrice = oldPrice + priceAdditionValueAdded;
       this.setState({
           totalPrice: newPrice,
           ingredients: updatedIngredients
       })
    }
    removeIngredientHandler = (type:any) =>{

    }

    render(){
        return(
            <Auxiliary>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls ingredientAdded={this.addIngredientHandler}/>
            </Auxiliary>

        );
    }
} 

export default BurgerBuilder;