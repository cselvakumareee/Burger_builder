import React from 'react';
import './NavigationItem.scss';
import { NavLink } from 'react-router-dom';

const NavigationItem = (props:any) => (
<li className="NavigationItem"><NavLink exact={props.exact } activeClassName="active" to={props.link}>{props.children}</NavLink></li>
);

export default NavigationItem;