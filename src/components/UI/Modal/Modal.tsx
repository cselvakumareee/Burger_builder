import React, { Component } from "react";
import "./Modal.scss";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props:any) => {
   
    return (
      <Auxiliary>
        <Backdrop clicked={props.modalClosed} show={props.show} />
        <div
          className="Modal"
          style={{
            transform: props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: props.show ? "1" : "0"
          }}
        >
          {props.children}
        </div>
      </Auxiliary>
    );
  
}
export default React.memo(Modal, (prevProps:any, nextProps:any)=>
(nextProps.show === prevProps.show && nextProps.children === prevProps.children));
