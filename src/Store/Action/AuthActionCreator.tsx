import * as actionTypes from './ActionTypes';
import axios from 'axios';

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token:any, userId: any) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error: any) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime:any) => {
    return (dispatch:any) => {
        setTimeout(()=>{
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

//Async code

export const auth = (email:any, password:any, isSignup:any) => {
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYCBVewlT_3h8RSLMIzRHgHXDwBUklL6Y';
    if(!isSignup){ 
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCYCBVewlT_3h8RSLMIzRHgHXDwBUklL6Y';
    }
    return (dispatch:any) =>{
        dispatch(authStart());
        axios.post(url, authData)
        .then(response =>{
            console.log(response);
            dispatch(authSuccess(response.data.idToken, response.data.LocalId));
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(error =>{
            console.log(error);
            dispatch(authFail(error.response.data.error));//Note: important
        })
    }
}