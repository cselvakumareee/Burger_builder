import React, { Component } from 'react';
import './App.scss';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import withErrorHandler from './hoc/withErrorHandler/withErrorHandler';

class App extends Component {
  // state={
  //   show:true
  // }
  //the below code used for checking remove interceptor is working in withErrorHandler.tsx
  // if its working we will get 0 in console
  // componentDidMount(){
  //   setTimeout(()=>{this.setState({show:false})},5000);
  // }
  render(){
    
    return (
      
      <div className="App">
       <Layout>
         {/* {this.state.show?<BurgerBuilder/>:null} */}
         <BurgerBuilder />
       </Layout>
      </div>
    );
  }
  
}

export default App;
