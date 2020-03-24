import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

interface BurgerBuilderInterface{
    type:number;
}

const INGREDIENT_PRICES = {
    salad: 0.4,
    cheese: 0.5,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component<BurgerBuilderInterface,{}> {
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

    addIngredientHandler = (type:number) => {
       const oldCount = this.state.ingredients[type];
       const updatedCount = oldCount + 1;
       const updatedIngredients = {
           ...this.state.ingredients
       };
       updatedIngredients[type] = updatedCount;
       const priceAddition = INGREDIENT_PRICES[type];
       const oldPrice = this.state.totalPrice;
       const newPrice = oldPrice + priceAddition;
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
            <BuildControls/>
            </Auxiliary>

        );
    }
} 

export default BurgerBuilder;