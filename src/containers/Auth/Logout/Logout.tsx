import React, { Component } from 'react';
import * as AuthActionCreator from '../../../Store/Action/Index';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

interface ILogoutProps{
    onLogout: any
}

class Logout extends Component<ILogoutProps,{}> {
    componentDidMount(){
       this.props.onLogout();
    }
    render(){
        return <Redirect to="/" />;
    };
};

const mapDispatchToProps = (dispatch:any) => {
    return {
        onLogout: ()=> dispatch(AuthActionCreator.logout())
    };
};

export default connect(null, mapDispatchToProps)(Logout);