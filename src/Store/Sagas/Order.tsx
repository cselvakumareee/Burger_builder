import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';
import * as OrderActionCreator from '../Action/Index';

export function* purchaseBurgerSaga (action:any) {
    yield put(OrderActionCreator.purchaseBurgerStart());
    try{
      const response = yield axios.post("/orders.json?auth="+action.token, action.orderData);
      yield put(OrderActionCreator.purchaseBurgerSuccess(response.data.name, action.orderData));
    }
    catch(error){
        yield put(OrderActionCreator.purchaseBurgerFail(error));
    }
}

export function* fetchOrdersSaga (action:any){
  yield put(OrderActionCreator.fetchOrdersStart());
  const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo='+'"' +action.userId + '"';
  try{
    const res = yield axios.get('/orders.json'+queryParams);
    const fetchedOrders = [];
    for(let key in res.data){
      yield fetchedOrders.push({...res.data[key],id:key});
  }
  yield put(OrderActionCreator.fetchOrdersSuccess(fetchedOrders));
  }
  catch(error){
    yield put(OrderActionCreator.fetchOrdersFail(error));
  }
}