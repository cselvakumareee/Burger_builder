import React, { useEffect } from "react";
import * as AuthActionCreator from "../../../Store/Action/Index";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Logout = (props: any) => {
  useEffect(() => {
    props.onLogout();
  }, []);

  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onLogout: () => dispatch(AuthActionCreator.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
