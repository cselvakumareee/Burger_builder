import React, { useEffect } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as OrderActionCreator from "../../Store/Action/Index";
import { fetchOrdersStart } from "../../Store/Action/OrderActionCreator";
import Spinner from "../../components/UI/Spinner/spinner";
import { connect } from "react-redux";

const Orders = (props: any) => {
  useEffect(() => {
    props.onInitFetchOrders(props.token, props.userId);
  }, []);

  let ordersComp = <Spinner />;
  if (!props.loading) {
    ordersComp = props.orders.map((order: any) => {
      return (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      );
    });
  }
  return <div>{ordersComp}</div>;
};

const mapStateToProps = (state: any) => {
  return {
    orders: state.Order.orders,
    loading: state.Order.loading,
    token: state.Auth.token,
    userId: state.Auth.userId,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onInitFetchOrders: (token: any, userId: any) =>
      dispatch(OrderActionCreator.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
