import * as actionTypes from '../Action/ActionTypes';
import { updateObject } from '../Utility';

const initialState:any = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = initialState, action:any) => {
    switch(action.type){
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            };
        case actionTypes.PURCHASE_BURGER_START:
            return{
                ...state,
                loading: true
            };
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            //Note: way 1
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.push(newOrder)
            };

            //Way 2: BY using utility
            //const newOrder = updateObject(action.orderData, { id:action.orderId });
            // return updateObject(state, {
            //     loading: false,
            //     purchased:true,
            //     orders: state.orders.push(newOrder)
            // });
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            };

            //return updateObject(state, {loading:false});

        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            }  

            //return updateObject(state, {loading: true});
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            };
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false
            }          
        default: 
        return state;        
    }
};

export default reducer;