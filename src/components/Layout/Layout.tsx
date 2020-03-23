import React from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import './Layout.scss';

const Layout = (props:any) => (
    <Auxiliary>
    <header>Toolbar, sidedrawer, backdrop</header>
    <main className= "content">
        {props.children}
    </main>
    </Auxiliary>
);

export default Layout;