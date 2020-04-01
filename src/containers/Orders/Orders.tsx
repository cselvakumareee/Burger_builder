import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{
    state={
        orders:[],
        loading:true
    }
    componentDidMount(){
       axios.get('/orders.json')
       .then(res=>{
           console.log("resData"+res.data);
           const fetchedOrders = [];
           //Note: In fetchedOrders, we are storing values as a array of object thats y we are using for loop here
           for(let key in res.data){
               fetchedOrders.push({...res.data[key],id:key});
           }
           this.setState({loading:false, orders:fetchedOrders})
       }).catch(error=>{
          this.setState({loading:false});
       });
    }
    render(){
        return(
            <div>
              {this.state.orders.map((order:any)=>{
                return <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
              })}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);