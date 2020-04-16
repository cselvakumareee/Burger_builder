import React, { Component } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import "./Layout.scss";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/SideDrawer/SideDrawer";
import { connect } from 'react-redux';

interface ILayoutProps{
  
  isAuthenticate:any
}

class Layout extends Component<ILayoutProps,{}> {
   state = {
       sideDrawerClosed: false
   }

   sideDrawerHandler = () => {
       this.setState({
           sideDrawerClosed: false
       })
   }
    
   sideDrawerToggleHandler = () =>{
     this.setState((prevState:any) => {
       return{
         sideDrawerClosed:!prevState.sideDrawerClosed
       }
     });
   }

  render() {
    return (
      <Auxiliary>
        <Toolbar isAuth={this.props.isAuthenticate} sideDrawerToggled={this.sideDrawerToggleHandler}/>
        <SideDrawer isAuth={this.props.isAuthenticate} open={this.state.sideDrawerClosed} closed={this.sideDrawerHandler}/>
        <main className="content">{this.props.children}</main>
      </Auxiliary>
    );
  }
}

const mapStateToProps = (state:any) => {
  return {
    isAuthenticate: state.Auth.token != null
  }
}

export default connect(mapStateToProps)(Layout);
