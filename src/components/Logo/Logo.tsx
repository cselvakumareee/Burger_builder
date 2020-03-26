import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import './Logo.scss';

const Logo = (props:any) => (
    <div className="Logo" style={{height: props.height}}>
        <img src={burgerLogo} alt="Burger Logo"/>
    </div>
);

export default Logo;