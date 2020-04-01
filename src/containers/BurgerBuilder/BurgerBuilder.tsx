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

interface IBurgerBuilderProps{
  match:any,
  history:any
}

class BurgerBuilder extends Component<IBurgerBuilderProps,{}> {
  constructor(props: any) {
    super(props);
  }

  state = {
    ingredients: {
      salad: '',
      bacon: '',
      cheese: '',
      meat: ''
    },
    //ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error:false,
    queryParams:[]
  };

  componentDidMount(){
    console.log("burgerbuilder"+this.props.match.history);
    axios.get("/ingredients.json").then(response =>{
      console.log("ingredientsjson"+response.data);
      this.setState({ingredients:response.data})
    }).catch(error =>{
      this.setState({error:true});
    })
  }

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
    
    //Note: convert state ingredients to query search -- important
    let queryParamsFinal:any = this.state.queryParams;
    let stateIngredients:any = {...this.state.ingredients};
    for(let i in stateIngredients){
      queryParamsFinal.push(encodeURIComponent(i)+'='+encodeURIComponent(stateIngredients[i]));
    }
    queryParamsFinal.push("price="+this.state.totalPrice.toFixed(2));
    let queryString = queryParamsFinal.join('&');
    this.props.history.push({
      pathname:'/checkout',
      search:'?'+queryString
    })
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

    
    let orderSummary = null;
    
     let burger = this.state.error?<p>Ingredients cant be loaded</p>:<Spinner />;
     if(this.state.ingredients){
      burger = (<Auxiliary>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfoFinal}
          price={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
          ordered={this.purchaseHandler}
        />
      </Auxiliary>);

   orderSummary = <OrderSummary
price={this.state.totalPrice}
purchaseContinued={this.purchaseContinueHandler}
purchaseCancelled={this.purchaseCancelHandler}
ingredients={this.state.ingredients}
/>;
     }
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
        {burger}
      </Auxiliary>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
