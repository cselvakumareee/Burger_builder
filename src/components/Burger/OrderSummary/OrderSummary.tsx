import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';

const orderSummary = (props:any) => {
      const ingredients = props.ingredients;
      const ingrdientsToShow = Object.keys(ingredients)
      .map(igkey => {
      return(<li key={igkey}><span style={{textTransform:'capitalize'}}>{igkey}</span>:{ingredients[igkey]}</li>);
      })
      
    // let ingredientSummaryUpdated:any = Object.keys(props.ingredients)
    // .map((igkey) =>{
    // return [...Array(props.ingrdients[igkey])].map((_,i)=>{
    // return(<li>{igkey}</li>)
    // });
    // });
    console.log("ingredient summary"+(props.ingrdients));
    return(
       <Auxiliary>
           <h3>Your order</h3>
           <p>A deliciour burger with following ingrdients:</p>
           <ul>
             {ingrdientsToShow}
           </ul>
           <p>continue to checkout</p>
       </Auxiliary>
    );

};

export default orderSummary;