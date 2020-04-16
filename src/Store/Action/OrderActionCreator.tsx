import * as actionTypes from './ActionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id:any, orderData:any) => {
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error:any) => {
    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

//Async action creator

export const purchaseBurger = (orderData:any, token:any) => {
    return {
        type: actionTypes.PURCHASE_BURGER,
        orderData: orderData,
        token: token
    }
    // return (dispatch:any)=>{
    //     dispatch(purchaseBurgerStart());

    //     axios
    //     .post("/orders.json?auth="+token, orderData)
    //     .then(response => {
    //       console.log(response.data);
    //       dispatch(purchaseBurgerSuccess(response.data.name, orderData));
    //     })
    //     .catch(error => {
    //       dispatch(purchaseBurgerFail(error));
    //     });
    // };
};

export const fetchOrdersSuccess = (fetchOrders:any) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: fetchOrders
    };
};

export const fetchOrdersFail = (error: any) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = (token:any, userId:any) => {
    return {
        type: actionTypes.FETCH_ORDERS,
        token: token,
        userId: userId
    }
    // return (dispatch:any) => {
    //     dispatch(fetchOrdersStart());
    //     const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo='+'"' +userId + '"';
    //     axios.get('/orders.json'+queryParams)
    //    .then(res=>{
    //        console.log("resData"+res.data);
    //        const fetchedOrders = [];
    //        //Note: In fetchedOrders, we are storing values as a array of object thats y we are using for loop here
    //        for(let key in res.data){
    //            fetchedOrders.push({...res.data[key],id:key});
    //        }
    //        dispatch(fetchOrdersSuccess(fetchedOrders));
    //    }).catch(error=>{
    //       dispatch(fetchOrdersFail(error));
    //    });
    // }
}