import React, { useState, useEffect } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import Modal from "../../components/UI/Modal/Modal";
import Axios from "axios";

const withErrorHandler = (WrappedComponent: any, axios: any) => {
  return (props: any) => {
    const [error, setError]: any = useState(null);

    const requestInterceptor = axios.interceptors.request.use((req: any) => {
      setError(null);
      return req;
    });
    const responseInterceptor = axios.interceptors.response.use(
      (res: any) => res,
      (err: any) => {
        setError(err);
      }
    );
    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.response.eject(responseInterceptor);
      };
    }, [requestInterceptor, responseInterceptor]);

    const errorConfirmHandler = () => {
      setError(null);
    };

    return (
      <Auxiliary>
        {error ? (
          <Modal show={error} modalClosed={errorConfirmHandler}>
            {error ? error.message : null}
          </Modal>
        ) : null}

        <WrappedComponent {...props}>/></WrappedComponent>
      </Auxiliary>
    );
  };
};

export default withErrorHandler;
