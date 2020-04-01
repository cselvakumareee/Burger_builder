import React from 'react';
import './CheckoutSummary.scss';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = (props:any) => {
    return(
        <div className="CheckoutSummary">
           <h1>we hope tastes well</h1>
           <div style={{width:'100%', margin:'auto'}}>
              <Burger ingredients={props.ingredients}/>
           </div>
           <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
           <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    );
}

export default CheckoutSummary;