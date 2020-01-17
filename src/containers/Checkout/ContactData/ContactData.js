import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import orderAxiosInstance from "../../../axios/order";
import Loader from "../../../components/UI/Loader/Loader";
import Input from "../../../components/UI/Input/Input";
import contact from "./orderForm";
import { connect } from "react-redux";
import * as orderActions from "../../../store/actions/index";

import classes from "./ContactData.css"
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

class ContactData extends Component {

    state = {
        orderForm: null,
        formValidity: false
        
    }

    orderHandler = ( event ) => {
        event.preventDefault();

        const formData = {};

        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].elementConfig.value;
        }
        
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.idToken);

        // orderAxiosInstance.post("orders.json", data)
        // .then( response => {
        //     console.log(response);
        //     this.setState({loading: false});
        //     this.props.history.replace("/");
        // })
        // .catch( error => {
        //     console.log(error);
        //     this.setState({loading: false});
        // });
    }

    checkValidity (value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value === "- Select Delivery Method -" ? 
            (value.trim() !== "" && isValid) && value !== "- Select Delivery Method -" :
            (value.trim() !== "" && isValid);
        }

        if (rules.number) {
            const pattern = new RegExp("^[0-9]{5}$");
            isValid = pattern.test(value) && isValid;
        }

        if (rules.maxLength) {
            isValid = rules.maxLength <= value.length && isValid;
        }

        if (rules.minLength) {
            isValid = rules.minLength >= value.length && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const orderFormCopy = {
            ...this.state.orderForm
        }

        const orderFormKeyCopy = {
            ...this.state.orderForm[inputIdentifier]
        }

        const orderFormElementConfigCopy = {
            ...this.state.orderForm[inputIdentifier].elementConfig
        }

        orderFormElementConfigCopy.value = event.target.value;
        orderFormKeyCopy.elementConfig = orderFormElementConfigCopy;
        orderFormKeyCopy.validationRules.valid = 
        this.checkValidity(orderFormElementConfigCopy.value, orderFormKeyCopy.validationRules);
        orderFormKeyCopy.touched = true;
        orderFormCopy[inputIdentifier] = orderFormKeyCopy;
        
        let formValidity = true;

        for (let identifier in orderFormCopy) {
            formValidity = orderFormCopy[identifier].validationRules.valid && formValidity;
        }

        this.setState({
            orderForm: orderFormCopy, formValidity
        });
    } 

    render () {
        let inputElements = null;

        if (this.state.orderForm) {
            const orderForm = Object.entries(this.state.orderForm);
            inputElements = orderForm.map( (ie) => {
                // ie = ['name', {}]
                return <Input 
                            key={ie[0]} 
                            elementtype={ie[1].elementType}
                            {...ie[1].elementConfig}
                            changed={(event) => this.inputChangedHandler(event, ie[0])} 
                            invalid={!ie[1].validationRules.valid}
                            touched={ie[1].touched}/>;
            });
        }

        let form = (
            <form>
                {inputElements}
                <Button 
                    btnType="Success"
                    clicked={this.orderHandler}
                    disabled={!this.state.formValidity}>ORDER</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Loader />;
        }

        return (
            <div className={classes.ContactData}>
                <h4> Enter Your Contact Data </h4>
                {form}
            </div>
        )
    }

    componentDidMount () {
        const orderForm = contact.orderForm;
        this.setState({orderForm});
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        idToken: state.auth.idToken,
        userId: state.auth.userId
    }
};

const mapDipatchToState = dispatch => {
    return {
        onOrderBurger: (orderData, idToken) => dispatch(orderActions.purchaseBurger(orderData, idToken))
    }
}
export default connect(mapStateToProps, mapDipatchToState)(withErrorHandler(ContactData, orderAxiosInstance));