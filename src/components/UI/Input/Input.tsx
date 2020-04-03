import React, { Component } from "react";
import "./Input.scss";
import { elementType } from "prop-types";

interface IInputProps{
  elementtype:any,
  elementConfig:any,
  value:any,
  changed:any,
  invalid:any,
  shouldValidate:any,
  touched:any
  //label:any
}

class Input extends Component<IInputProps,{}> {
  constructor(props:any){
    super(props);
    console.log("elementType"+props.elementtype);
  }
  render() {
    let inputElement = null;
    let elementTypeFinal = this.props.elementtype;
    let inputClasses = ["InputElement"];
    let validationError = null;
    if(this.props.invalid && this.props.shouldValidate && this.props.touched){
      inputClasses.push('Invalid');
      validationError = <p>Please enter valid value</p>
    }

   // console.log("elementtype" + elementTypeFinal);
    // let inputColumn = "input";
    //let selectColumn = "select";
    //let optionValues = {...props.elementConfig.options};
    switch (elementTypeFinal) {
      case ("input"):
        inputElement = (
          <input
            className={inputClasses.join(' ')}
            {...this.props.elementConfig}
            value={this.props.value}
            onChange={this.props.changed}
          />
        );
        break;

      case ("textarea"):
        inputElement = (
          <textarea
            className={inputClasses.join(' ')}
            {...this.props.elementConfig}
            value={this.props.value}
            onChange={this.props.changed}
          />
        );
        break;

      case ("select"):
        inputElement = (
          <select
            className={inputClasses.join(' ')}
            value={this.props.value}
            onChange={this.props.changed}
          >
            <option>selva</option>
            <option>kumar</option>
            {/* {props.elementConfig.option.map((opt: any) => ( 
              <option value={opt.value}>
                {opt.displayValue}
              </option>
              
            ))}  */}
          </select>
        );
        break;

      default:
        inputElement = (
          <input
            className={inputClasses.join(' ')}
            {...this.props.elementConfig}
            value={this.props.value}
            onChange={this.props.changed}
          />
        );

        return (
          <div className="Input">
            {/* <label className="Label">{this.props.label}</label> */}
            {inputElement}
            {validationError}
          </div>
        );
    }
  }
}

export default Input;
