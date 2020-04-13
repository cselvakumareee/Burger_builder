import React from 'react';
import './NavigationItems.scss';
import NavigationItem from './NavigationItem/NavigationItem';
import { Link } from 'react-router-dom';

const NavigationItems = (props:any) => (
    <ul className="NavigationItems">
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {props.isAuthenticate ? <NavigationItem link="/orders">Orders</NavigationItem>: null}
       {!props.isAuthenticate ? <NavigationItem link="/auth">Authenticate</NavigationItem> : 
       <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
);

export default NavigationItems;