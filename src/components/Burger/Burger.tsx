import React from 'react';
import './Burger.scss';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import { withRouter } from 'react-router-dom';

const Burger = (props:any) => {
   console.log("burger"+props);
   //To transform ingredient object into array then only we can map ingredient
   let transformedIngredient = Object.keys(props.ingredients)
   .map(igKey =>{
      return[...Array(props.ingredients[igKey])].map((_,i)=>{
         return <BurgerIngredients key = {igKey+i} type = {igKey} />;
      });
   }).reduce((arr, el)=>{
      return arr.concat(el)
   }, []);

   if(transformedIngredient.length === 0){
       transformedIngredient.push(<p>please add the ingredient</p>)
   }
   console.log(transformedIngredient);
     return(
        <div className="Burger">
           <BurgerIngredients type = "bread-top" />
             {transformedIngredient}
           <BurgerIngredients type = "bread-bottom" />
        </div>
     );
};

export default withRouter(Burger);