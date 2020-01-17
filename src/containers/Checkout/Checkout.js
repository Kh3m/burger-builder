import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {

    state = {
        ingredients: {
            salad: {quantity: 0},
            bacon: {quantity: 0},
            cheese: {quantity: 0},
            meat: {quantity: 0}
        },
        totalPrice: 4
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }

    render  () {
        let summary = <Redirect to="/"/>;
        if (this.props.ings) {
            let purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchasedRedirect} 
                    <CheckoutSummary 
                        checkoutCancelled={this.checkoutCancelHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                        ingredients={this.props.ings}/>

                    <Route 
                        path={this.props.match.path + "/contact-data"}
                        component={ContactData} />
                </div>
            );
        }
        return summary;
    }

    // componentDidMount () {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let totalPrice = 4;

    //     for (let [key, value] of query.entries()) {
    //         if (key === "totalPrice") {
    //             totalPrice = +value;
    //         } else {
    //             ingredients[key] = {quantity: +value};
    //         }
           
    //     }

    //     this.setState({ingredients, totalPrice});
    // }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};

export default connect(mapStateToProps)(Checkout);