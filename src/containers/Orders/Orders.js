
import React, { Component } from "react";
import Order from "../../components/Order/Order";
import orderAxiosInstance from "../../axios/order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Loader from "../../components/UI/Loader/Loader";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class Orders extends Component {
    
    render () {
        
        let orders = (
            <div>
                {
                    this.props.orders.map( order => {
                        return <Order 
                                    key={order.id}
                                    ingredients={order.ingredients}
                                    price={order.price}/>
                    })
                }
            </div>
        );

        if (this.props.loading) {
            orders = <Loader />
        }
        return orders;

    }

    componentDidMount () {
        this.props.onFetchOrders(this.props.idToken, this.props.userId);
        // const fetchedOrders = [];

        // orderAxiosInstance.get("orders.json")
        // .then (res => {
        //     for (let key in res.data) {
        //         fetchedOrders.push({
        //             id: key,
        //             ...res.data[key]
        //         });
        //     }
        //     this.setState({loading: false, orders: fetchedOrders});
        // })
        // .catch ( err => {
        //     this.setState({loading: false});
        // });
    }
}

const mapStateToProps = ( state ) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        idToken: state.auth.idToken,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return {
        onFetchOrders: (idToken, userId) => dispatch(actions.fetchOrders(idToken, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, orderAxiosInstance));