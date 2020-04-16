import React from 'react';
import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import './SideDrawer.scss';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../UI/Backdrop/Backdrop';

const SideDrawer = (props:any) =>{
    let attachedClasses = ['SideDrawer', 'Close'];

    if(props.open){
        attachedClasses = ['SideDrawer', 'Open'];
    }

    return (
        <Auxiliary>
            <Backdrop className={attachedClasses} show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
           <Logo height="11%"/>
           <nav>
               <NavigationItems isAuthenticate={props.isAuth}/>
           </nav>
        </div>
        </Auxiliary>
    );
};

export default SideDrawer;
