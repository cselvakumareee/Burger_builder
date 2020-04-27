import React, { useState } from "react";
import Button from "../../../components/UI/Button/Button";
import "./ContactData.scss";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as OrderActionCreator from '../../../Store/Action/Index';

const ContactData = (props:any) => {
  const [OrderForm, setOrderForm]:any = useState({
      name: {
        elementtype: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation:{
          required: true
        },
        valid: false,
        touched:false
      },
      street: {
        elementtype: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Street name"
        },
        value: "",
        validation:{
          required: true
        },
        valid: false,
        touched:false
      },
      zipcode: {
        elementtype: "input",
        elementConfig: {
          type: "text",
          placeholder: "Postal code"
        },
        value: "",
        validation:{
          required: true,
          minLength:5,
          maxLength: 5
        },
        valid: false,
        touched:false
      },
      country: {
        elementtype: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country name"
        },
        value: "",
        validation:{
          required: true
        },
        valid: false,
        touched:false
      },
      email: {
        elementtype: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: "",
        validation:{
          required: true
        },
        valid: false,
        touched:false
      },
      deliveryMethod: {
        elementtype: "select",
        elementConfig: {
          options: [
            { value: "Fastest", displayValue: "Fastest" },
            { value: "Cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "Fastest",
        valid:true,
        validation:{}
      }
    });
    const [formIsValid, setFormIsValid]:any = useState(false);
   
  const orderHandler = (event: any) => {
    event.preventDefault();
    
    const formData: any = {};
    let orderFormLoop: any = { ...OrderForm };
    for (let formElementIdentifier in orderFormLoop) {
      formData[formElementIdentifier] =
        orderFormLoop[formElementIdentifier].value;
      //output: name: 'selva'
    }
    const order = {
      ingredients: props.ings,
      price: props.price,
      
      orderData: formData,
      userId: props.userId
    };
    props.onOrderBurger(order, props.token);
  };

  const checkValidity = (value:any, rules:any) =>{
   let isValid = true;

   if(!rules){
     return true;
   }
   if(rules.required){
     isValid = value.trim() !== '' && isValid;
   }
   if(rules.minLength){
     isValid = value.length >= rules.minLength && isValid;
   }
   if(rules.maxLength){
    isValid = value.length <= rules.maxLength && isValid;
  }
   return isValid;
  }

  const inputChangeHandler = (event: any, inputIdentifier: any) => {
    console.log(event.target.value);
    //Below will help to clone the object, but it wont clone deeply mainly it wont clone inside elementConfig
    const updatedOrderForm = { ...OrderForm };
    //To get rid of error we are cloning below again
    const updatedOrderFormFinal: any = { ...updatedOrderForm };

    //Below code will help deep clone specifically inside elementConfig //input identifier will help which input column is modified ex email, name
    const updatedFormElement = { ...updatedOrderFormFinal[inputIdentifier] };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;

    updatedOrderFormFinal[inputIdentifier] = updatedFormElement;

    
    let formIsValid = true;
    for(let inputIdentifier in updatedOrderFormFinal){
      formIsValid = updatedOrderFormFinal[inputIdentifier].valid && formIsValid;
    }
    //Note: here state property:above variable name like formIsValid:formIsValid
    setOrderForm(updatedOrderFormFinal);
    setFormIsValid(formIsValid);
  };
  
    const formElementArray = [];
    let orderFormFinal: any = { ...OrderForm };
    //Note: In state we have data as a js object but looping through we need array of object thats y we are using for loop here
    for (let key in orderFormFinal) {
      formElementArray.push({
        id: key,
        Config: orderFormFinal[key]
      });
    }
    let form = (
      <form onSubmit={orderHandler}>
        {formElementArray.map((formElement: any) => (
          <div>
          <Input
            key={formElement.id}
            elementtype={formElement.elementtype}
            elementConfig={formElement.Config.elementConfig}
            value={formElement.Config.value}
            invalid = {!formElement.Config.valid}
            shouldValidate = {formElement.Config.validation}
            touched = {formElement.Config.touched}
            changed={(event: any) =>
              inputChangeHandler(event, formElement.id)
            }
          />
          <p>{formElement.elementtype}</p>
          </div>
        ))}

        <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
      </form>
    );
    if (props.loading) {
      form = <Spinner />;
    }
    return (
      <div className="ContactData">
        <h4>Enter your details</h4>
        {form}
      </div>
    );
  
};

const mapStateToProps = (state:any) => {
  return{
    ings: state.BurgerBuilder.ingredients,
    price: state.BurgerBuilder.totalPrice,
    loading: state.Order.loading,
    token: state.Auth.token,
    userId: state.Auth.userId
  };
};

const mapDispatchToProps = (dispatch:any) => {
  return{
    onOrderBurger: (orderData:any, token:any)=> {
      return console.log('onOrderBurgeris triggering'), dispatch( OrderActionCreator.purchaseBurger(orderData,token))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
