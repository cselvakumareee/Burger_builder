import { put, delay } from 'redux-saga/effects';

import * as actionTypes from '../Action/ActionTypes';
import * as AuthActionCreator from '../Action/Index';

//Here function* is called so-call generator
export function* logoutSaga(action:any){
    yield localStorage.removeItem('token'); //yield is used to execute once removeitem(token) is over then it will go next line
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(AuthActionCreator.logoutSucceed()); //put used to call that method
    // yield put({
    //     type: actionTypes.AUTH_LOGOUT
    // });
}

export function* checkAuthTimeoutSaga(action:any){
    yield delay(action.expirationTime);
    yield put(AuthActionCreator.logout());
}