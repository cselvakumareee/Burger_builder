import { put, delay } from "redux-saga/effects";
import axios from "axios";
import * as actionTypes from "../Action/ActionTypes";
import * as AuthActionCreator from "../Action/Index";

//Here function* is called so-call generator
export function* logoutSaga(action: any) {
  yield localStorage.removeItem("token"); //yield is used to execute once removeitem(token) is over then it will go next line
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put(AuthActionCreator.logoutSucceed()); //put used to call that method
  // yield put({
  //     type: actionTypes.AUTH_LOGOUT
  // });
}

export function* checkAuthTimeoutSaga(action: any) {
  yield delay(action.expirationTime);
  yield put(AuthActionCreator.logout());
}

export function* authUserSaga(action: any) {
  yield put(AuthActionCreator.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYCBVewlT_3h8RSLMIzRHgHXDwBUklL6Y";
  if (!action.isSignup) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCYCBVewlT_3h8RSLMIzRHgHXDwBUklL6Y";
  }
  try {
    const response = yield axios.post(url, authData);
    const expirationDate: any = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", response.data.localId);
    yield put(
      AuthActionCreator.authSuccess(
        response.data.idToken,
        response.data.localId
      )
    );
    yield put(AuthActionCreator.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(AuthActionCreator.authFail(error.response.data.error)); //Note: important
  }
}

export function* authCheckStateSaga (action:any) {
    const token = yield localStorage.getItem('token'); //we are storing values in token variable its a sync task so we can use yield
    if(!token){
        yield put(AuthActionCreator.logout());
    }
    else{
        const expirationDateOld:any = yield localStorage.getItem('expirationDate');
        const expirationDate:any = yield new Date(expirationDateOld); //expirationDateOld is string so we are converting as a date
        if(expirationDate <= new Date()){  //ex 11PM <= 10PM so always else condition will go
            yield put(AuthActionCreator.logout());
        }
        else{
            const userId = yield localStorage.getItem('userId');
            yield put(AuthActionCreator.authSuccess(token, userId));
            yield put(AuthActionCreator.checkAuthTimeout((expirationDate.getTime()- new Date().getTime())/1000));
        }
    }
}
