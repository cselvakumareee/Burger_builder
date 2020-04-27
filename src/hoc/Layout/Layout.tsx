import React, { useState } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import "./Layout.scss";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/SideDrawer/SideDrawer";
import { connect } from 'react-redux';


const Layout = (props:any) =>{
  const [sideDrawerClosed, setSideDrawerClosed]:any = useState(false);
   
  const sideDrawerHandler = () => {
    setSideDrawerClosed(false);
   }
    
   const sideDrawerToggleHandler = () =>{
     setSideDrawerClosed(!sideDrawerClosed);
   }

  
    return (
      <Auxiliary>
        <Toolbar isAuth={props.isAuthenticate} sideDrawerToggled={sideDrawerToggleHandler}/>
        <SideDrawer isAuth={props.isAuthenticate} open={sideDrawerClosed} closed={sideDrawerHandler}/>
        <main className="content">{props.children}</main>
      </Auxiliary>
    );
  
}

const mapStateToProps = (state:any) => {
  return {
    isAuthenticate: state.Auth.token != null
  }
}

export default connect(mapStateToProps)(Layout);
