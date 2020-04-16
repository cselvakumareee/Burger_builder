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
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSucceed = ()=>{
    return {
        type: actionTypes.AUTH_LOGOUT
    }
} 
export const checkAuthTimeout = (expirationTime:any) => {
    // return (dispatch:any) => {
    //     setTimeout(()=>{
    //         dispatch(logout());
    //     }, expirationTime * 1000);
    // };
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime * 1000
    }
};

//Async code

export const auth = (email:any, password:any, isSignup:any) => {
    return{
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        isSignup: isSignup
    }
    // const authData = {
    //     email: email,
    //     password: password,
    //     returnSecureToken: true
    // }
    // let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYCBVewlT_3h8RSLMIzRHgHXDwBUklL6Y';
    // if(!isSignup){ 
    //     url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCYCBVewlT_3h8RSLMIzRHgHXDwBUklL6Y';
    // }
    // return (dispatch:any) =>{
    //     dispatch(authStart());
    //     axios.post(url, authData)
    //     .then(response =>{
    //         console.log(response);
    //         const expirationDate:any = new Date(new Date().getTime() + (response.data.expiresIn *1000));
    //         localStorage.setItem('token', response.data.idToken);
    //         localStorage.setItem('expirationDate', expirationDate);
    //         localStorage.setItem('userId', response.data.localId);
    //         dispatch(authSuccess(response.data.idToken, response.data.localId));
    //         dispatch(checkAuthTimeout(response.data.expiresIn))
    //     })
    //     .catch(error =>{
    //         console.log(error);
    //         dispatch(authFail(error.response.data.error));//Note: important
    //     })
    // }
}

export const setAuthRedirectPath = (path:any) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

//Here the code help for auto login
export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    }
    // return (dispatch:any) =>{
    //     const token = localStorage.getItem('token');
    //     if(!token){
    //         dispatch(logout());
    //     }
    //     else{
    //         const expirationDateOld:any = localStorage.getItem('expirationDate');
    //         const expirationDate:any = new Date(expirationDateOld); //expirationDateOld is string so we are converting as a date
    //         if(expirationDate <= new Date()){  //ex 11PM <= 10PM so always else condition will go
    //             dispatch(logout());
    //         }
    //         else{
    //             const userId = localStorage.getItem('userId');
    //             dispatch(authSuccess(token, userId));
    //             dispatch(checkAuthTimeout((expirationDate.getTime()- new Date().getTime())/1000));
    //         }
    //     }
    // }
}