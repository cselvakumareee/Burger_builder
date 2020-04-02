import React from "react";
import "./Input.scss";

const Input = (props: any) => {
  let inputElement:any;
  let elementTypeFinal = {...props.elementtype};
  console.log('elementtype'+elementTypeFinal);
 // let inputColumn = "input";
  //let selectColumn = "select";
  //let optionValues = {...props.elementConfig.options};
  switch (props.elementtype) {
      
    case "input":
      inputElement = (
        <input
          className="InputElement"
          {...props.elementConfig}
          value={props.value} onChange={props.changed}
        />
      );
      break;

    case "textarea":
      inputElement = (
        <textarea
          className="InputElement"
          {...props.elementConfig}
          value={props.value} onChange={props.changed}
        />
      );
      break;

    case "select":
      inputElement = (
        <select className="InputElement" value={props.value} onChange={props.changed}>
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
          className="InputElement"
          {...props.elementConfig}
          value={props.value} onChange={props.changed}
        />
      ); 
    
    // inputElement = (
    //     <select className="InputElement" value={props.value} onChange={props.changed}>
    //         <option>selva</option>
    //         <option>kumar</option>
    //        {/* {optionValues.map((opt: any) => ( 
    //         <option value={opt.value}>
    //           {opt.displayValue}
    //         </option> */}
            
    //       ))} 
    //     </select>
    //   );
  }
  return (
    <div className="Input">
      <label className="Label">{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
