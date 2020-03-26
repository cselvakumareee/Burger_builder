import React, { Component } from "react";
import "./Modal.scss";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

interface ImodalInterfaceProps {
  modalClosed: any;
  show: any;
}

class Modal extends Component<ImodalInterfaceProps, {}> {
   shouldComponentUpdate(nextProps:any, nextState:any){
       return nextProps.show !== this.props.show;
   }

   componentDidUpdate(){
       console.log("modal is rendering");
   }

  render() {
    return (
      <Auxiliary>
        <Backdrop clicked={this.props.modalClosed} show={this.props.show} />
        <div
          className="Modal"
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          {this.props.children}
        </div>
      </Auxiliary>
    );
  }
}
export default Modal;
