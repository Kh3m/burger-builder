import React, { Component } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {

        state = {
            error: null
        }

        render () {
            return (
                <Auxiliary>
                    <Modal show={this.state.error} closeModal={() => {
                        this.setState({error: null});
                    }}>
                        <p> {this.state.error ? this.state.error.message : null} </p>
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            );
            
        }

        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use( req => {
                this.setState({error: null});
                return req;
            }, 
            error => {
                this.setState({error});
                return Promise.reject(error);
            });
    
            this.resInterceptor = axios.interceptors.response.use( res => res, 
                error => {
                    this.setState({error});
                    return Promise.reject(error);
                });
        }

        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }
    }
}

export default withErrorHandler;