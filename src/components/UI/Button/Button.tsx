import React from 'react';
import './Button.scss';

const Button = (props:any) => (
<button className={["Button", (props.btnType)].join(' ')}
        onClick={props.clicked}>{props.children}</button>
);

export default Button;