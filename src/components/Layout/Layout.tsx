import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import "./Layout.scss";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../SideDrawer/SideDrawer";

interface ILayoutState{
  sideDrawerClosed:boolean;
}

class Layout extends Component<{},ILayoutState> {
   state = {
       sideDrawerClosed: false
   }

   sideDrawerHandler = () => {
       this.setState({
           sideDrawerClosed: false
       })
   }
    
   sideDrawerToggleHandler = () =>{
     this.setState(prevState => {
       return{
         sideDrawerClosed:!prevState.sideDrawerClosed
       }
     });
   }

  render() {
    return (
      <Auxiliary>
        <Toolbar sideDrawerToggled={this.sideDrawerToggleHandler}/>
        <SideDrawer open={this.state.sideDrawerClosed} closed={this.sideDrawerHandler}/>
        <main className="content">{this.props.children}</main>
      </Auxiliary>
    );
  }
}

export default Layout;
