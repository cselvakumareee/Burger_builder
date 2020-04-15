import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/spinner";
import "./Auth.scss";
import * as AuthActionCreator from "../../Store/Action/Index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

interface IAuthProps {
  onAuth: any;
  loading: any;
  error: any;
  isAuthenticate: any;
  onSetAuthRedirectPath:any,
  buildingBurger:any,
  authRedirectPath:any,
  history: any
}

class Auth extends Component<IAuthProps, {}> {
  state: any = {
    controls: {
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
    },
    isSignup: true,
  };
  componentDidMount(){
    if(!this.props.buildingBurger && this.props.authRedirectPath != '/'){
      this.props.onSetAuthRedirectPath();
    }
    
  }
  checkValidity = (value: any, rules: any) => {
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
  inputChangeHandler = (event: any, controlName: any) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };
  submitHandler = (event: any) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchAuthModeHandler = () => {
    this.setState((prevState: any) => {
      return {
        isSignup: !prevState.isSignup,
      };
    });
  };
  render() {
    const formElementArray = [];
    let controlsFinal: any = { ...this.state.controls };
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
        changed={(event: any) => this.inputChangeHandler(event, formElement.id)}
      />
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }
    let authRedirect = null;
    if (this.props.isAuthenticate) {
      authRedirect = <Redirect to={this.props.onSetAuthRedirectPath} />;
    }
    return (
      <div className="Auth">
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">
          SWITCH TO {this.state.isSignup ? "SIGN IN" : "SIGN UP"}
        </Button>
      </div>
    );
  }
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
