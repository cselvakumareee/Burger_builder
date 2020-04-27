import React, { useState, useEffect } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/spinner";
import "./Auth.scss";
import * as AuthActionCreator from "../../Store/Action/Index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Auth = (props:any) => {
  
     const [controls, setControls]:any = useState({
      email: {
        elementtype: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementtype: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    });
    const [isSignup, setIsSignup]:any = useState(true);
    
    useEffect(()=>{
      if(!props.buildingBurger && props.authRedirectPath != '/'){
        props.onSetAuthRedirectPath();
      }
    },[]);

  const checkValidity = (value: any, rules: any) => {
    let isValid = true;

    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  const inputChangeHandler = (event: any, controlName: any) => {
    const updatedControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation
        ),
        touched: true,
      },
    };
    setControls(updatedControls);
  };

  const submitHandler = (event: any) => {
    event.preventDefault();
    props.onAuth(
      controls.email.value,
      controls.password.value,
      isSignup
    );
  };

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
    
  };
  
    const formElementArray = [];
    let controlsFinal: any = { ...controls };
    //Note: In state we have data as a js object but looping through we need array of object thats y we are using for loop here
    for (let key in controlsFinal) {
      formElementArray.push({
        id: key,
        Config: controlsFinal[key],
      });
    }
    let form: any = formElementArray.map((formElement: any) => (
      <Input
        key={formElement.id}
        elementtype={formElement.elementtype}
        elementConfig={formElement.Config.elementConfig}
        value={formElement.Config.value}
        invalid={!formElement.Config.valid}
        shouldValidate={formElement.Config.validation}
        touched={formElement.Config.touched}
        changed={(event: any) => inputChangeHandler(event, formElement.id)}
      />
    ));

    if (props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (props.error) {
      errorMessage = <p>{props.error.message}</p>;
    }
    let authRedirect = null;
    if (props.isAuthenticate) {
      authRedirect = <Redirect to={props.onSetAuthRedirectPath} />;
    }
    return (
      <div className="Auth">
        {authRedirect}
        {errorMessage}
        <form onSubmit={submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button clicked={switchAuthModeHandler} btnType="Danger">
          SWITCH TO {isSignup ? "SIGN IN" : "SIGN UP"}
        </Button>
      </div>
    );
  
}

const mapStateToProps = (state: any) => {
  return {
    loading: state.Auth.loading,
    error: state.Auth.error,
    isAuthenticate: state.Auth.token !== null,
    buildingBurger: state.BurgerBuilder.building,
    authRedirectPath: state.Auth.authRedirectPath
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAuth: (email: any, password: any, isSignup: any) =>
      dispatch(AuthActionCreator.auth(email, password, isSignup)),
    onSetAuthRedirectPath: ()=> dispatch(AuthActionCreator.setAuthRedirectPath('/'))  
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
