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
        {controls.map(ctrl=>(
            <BuildControl key={ctrl.label} label={ctrl.label} type={ctrl.type}/>
        ))}
     </div>
);

export default BuildControls;