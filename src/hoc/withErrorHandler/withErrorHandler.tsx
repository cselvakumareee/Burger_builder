import React, { Component } from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';
import Axios from 'axios';

// interface Imodalprops{
//     modalClosed: any;
//   show: any;
// }

const withErrorHandler = (WrappedComponent:any,axios:any) => {
return class extends Component{
    state={
        errorShow:false,
        error:{
            message:''
        }
    }
    componentDidMount(){
        axios.interceptors.request.use((req:any)=>{
            this.setState({error:null});
            return req;
        })
        axios.interceptors.response.use((res:any) => res, (error:any)=>{
            console.log("error is"+error.message);
          this.setState({error:error, errorShow:true
          });
          
        })
    }

    errorConfirmHandler= () =>{
        this.setState({error:null, errorShow:false});
    }
    render(){
        
        return(
        <Auxiliary> 
            {this.state.errorShow?
                <Modal show={this.state.error}
          modalClosed={this.errorConfirmHandler}>
                {this.state.error ?this.state.error.message:null}
            </Modal>:null}
            
            
            <WrappedComponent {...this.props}>/></WrappedComponent>
        </Auxiliary>
        );
    }
}

}

export default withErrorHandler;