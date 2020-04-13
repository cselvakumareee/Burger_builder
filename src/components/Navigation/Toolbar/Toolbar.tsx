import React from 'react';
import './Toolbar.scss';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props:any) => (
    <header className="Toolbar">
        <DrawerToggle clicked={props.sideDrawerToggled}/>
        <Logo height="80%"/>
        <nav className="DesktopOnly">
            <NavigationItems isAuthenticate={props.isAuth}/>
        </nav>
    </header>
);

export default Toolbar;