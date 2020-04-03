import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import "./ContactData.scss";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/spinner";
import Input from "../../../components/UI/Input/Input";

interface IContactDataProps {
  ingredients: any;
  price: any;
  history: any;
}

class ContactData extends Component<IContactDataProps, {}> {
  constructor(props:any){
super(props);
console.log()
  }
  state = {
    OrderForm: {
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
        valid: false
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
        valid: false
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
        valid: false
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
        valid: false
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
        valid: false
      },
      deliveryMethod: {
        elementtype: "select",
        elementConfig: {
          options: [
            { value: "Fastest", displayValue: "Fastest" },
            { value: "Cheapest", displayValue: "Cheapest" }
          ]
        },
        value: ""
      }
    },
    loading: false
  };

  orderHandler = (event: any) => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const formData: any = {};
    let orderFormLoop: any = { ...this.state.OrderForm };
    for (let formElementIdentifier in orderFormLoop) {
      formData[formElementIdentifier] =
        orderFormLoop[formElementIdentifier].value;
      //output: name: 'selva'
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      //Note: Below place if you are using this.state.orderform you will get lots of unwanted fields like elementConfig & elementType:input
      //thats y they are using form data
      orderData: formData
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        console.log(response);
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  checkValidity = (value:any, rules:any) =>{
   let isValid = true;
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

  inputChangeHandler = (event: any, inputIdentifier: any) => {
    console.log(event.target.value);
    //Below will help to clone the object, but it wont clone deeply mainly it wont clone inside elementConfig
    const updatedOrderForm = { ...this.state.OrderForm };
    //To get rid of error we are cloning below again
    const updatedOrderFormFinal: any = { ...updatedOrderForm };

    //Below code will help deep clone specifically inside elementConfig //input identifier will help which input column is modified ex email, name
    const updatedFormElement = { ...updatedOrderFormFinal[inputIdentifier] };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);

    updatedOrderFormFinal[inputIdentifier] = updatedFormElement;
    console.log(updatedFormElement);
    this.setState({ OrderForm: updatedOrderFormFinal });
  };
  render() {
    const formElementArray = [];
    let orderFormFinal: any = { ...this.state.OrderForm };
    //Note: In state we have data as a js object but looping through we need array of object thats y we are using for loop here
    for (let key in orderFormFinal) {
      formElementArray.push({
        id: key,
        Config: orderFormFinal[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map((formElement: any) => (
          <div>
          <Input
            key={formElement.id}
            elementtype={formElement.elementtype}
            elementConfig={formElement.Config.elementConfig}
            value={formElement.Config.value}
            changed={(event: any) =>
              this.inputChangeHandler(event, formElement.id)
            }
          />
          <p>{formElement.elementtype}</p>
          </div>
        ))}

        <Button btnType="Success">ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className="ContactData">
        <h4>Enter your details</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
