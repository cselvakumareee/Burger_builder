import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../Action/ActionTypes';
import { logoutSaga, checkAuthTimeoutSaga } from './Auth';

export function* watchAuth(){
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga); //Take every is listener
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
}

