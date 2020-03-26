import React from 'react';
import './NavigationItem.scss';

const NavigationItem = (props:any) => (
<li className="NavigationItem"><a href={props.link} className={props.active ? 'active': undefined}>{props.children}</a></li>
);

export default NavigationItem;