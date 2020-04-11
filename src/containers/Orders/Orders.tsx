import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as OrderActionCreator from '../../Store/Action/Index';
import { fetchOrdersStart } from '../../Store/Action/OrderActionCreator';
import Spinner from '../../components/UI/Spinner/spinner';
import { connect } from 'react-redux';

interface IOrdersProps{
    onInitFetchOrders:any,
    orders: any,
    loading: any
}

class Orders extends Component<IOrdersProps, {}>{
    
    componentDidMount(){
        this.props.onInitFetchOrders();
    }
    render(){
        let ordersComp = <Spinner />
        if(!this.props.loading){
           ordersComp = this.props.orders.map((order:any)=>{
                return <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
            })
           
        }
        return(
            <div>
              {ordersComp}
            </div>
        );
    }
}

const mapStateToProps = (state:any) => {
    return{
        orders: state.Order.orders,
        loading: state.Order.loading
    }
}

const mapDispatchToProps = (dispatch:any) =>{
    return {
        onInitFetchOrders: ()=> dispatch(OrderActionCreator.fetchOrders())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));