import React from 'react';
import './BuildControls.scss';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label:'Salad', type:'salad' },
    { label:'Bacon', type:'bacon' },
    { label:'Cheese', type:'cheese' },
    { label:'Meat', type:'meat' },
];

const BuildControls = (props:any) => (
     <div className="BuildControls">
         <p>current price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl=>(
            <BuildControl key={ctrl.label} label={ctrl.label} type={ctrl.type} added={()=>props.ingredientAdded(ctrl.type)}
            removed={()=>props.ingredientRemoved(ctrl.type)}
            disabled = {props.disabled[ctrl.type]} />
        ))}
        <button className="OrderButton" onClick={props.ordered} disabled={!props.purchaseable}>{props.isAuth ? 'ORDER NOW' : 'SIGNUP TO ORDER'}</button>
     </div>
);

export default BuildControls;