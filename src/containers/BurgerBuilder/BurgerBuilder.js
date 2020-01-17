import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import orderAxiosInstance from "../../axios/order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Loader from "../../components/UI/Loader/Loader";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false
    };

    updatedPurchasableState = () => {

        const sum = Object.values( this.props.ings )
            .reduce( (acc, cur) => {
                return acc + cur.quantity;
            }, 0);

        return sum > 0;
    }

    addQuantityHandler = ( type ) => {
        const oldQuantity = this.state.ingredients[type].quantity;
        const newQuantity = oldQuantity + 1;
        const oldPrice = this.state.totalPrice;
        const additionPrice = this.state.ingredients[type].price;
        const newPrice = oldPrice + additionPrice;

        const updatedIngredients = { 
            ...this.state.ingredients 
        };

        updatedIngredients[type].quantity = newQuantity;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatedPurchasableState( updatedIngredients );
    }

    removeQuantityHandler = ( type ) => {

        const oldQuantity = this.state.ingredients[type].quantity;
        if ( oldQuantity <= 0) return;
        const newQuantity = oldQuantity - 1;
        const oldPrice = this.state.totalPrice;
        const deductionPrice = this.state.ingredients[type].price;
        const newPrice = oldPrice - deductionPrice;

        const updatedIngredients = { 
            ...this.state.ingredients 
        };

        updatedIngredients[type].quantity = newQuantity;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

        this.updatedPurchasableState( updatedIngredients );
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.onSetAuthRedirectPath("/checkout");
            this.props.history.push({pathname: "/auth"});
        }
    }

    purchaseCancelHandler = () => {  
       this.setState({purchasing: false});        
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push("/checkout");
    }

    render () {

        const disabledInfo = {
            ...this.props.ings
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = this.props.ings[key].quantity <= 0;
        }

        let orderSummary = null;

        let burger = this.props.error ? <p> Ingredients can't be loaded </p> : <Loader />

        if (this.props.ings) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                        addIngredient={this.props.onIngredientAdded}
                        removeIngredient={this.props.onIngredientRemoved}
                        disabledInfo={disabledInfo}
                        price={this.props.price}
                        isAuthenticated={this.props.isAuthenticated}
                        purchaseble={this.updatedPurchasableState()}
                        purchaseHandler={this.purchaseHandler}/>
                </Auxiliary>
            );

            orderSummary = <OrderSummary 
                        ingredients={this.props.ings}
                        purchaseCancelHandler={this.purchaseCancelHandler}
                        purchaseContinueHandler={this.purchaseContinueHandler}
                        totalPrice={this.props.price}/>;
        }

        if (this.state.loading) {
            orderSummary = <Loader />
        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} closeModal={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }

    componentDidMount () {
        this.props.onInitIngredient();
        // orderAxiosInstance.get("ingredients.json")
        // .then( response => {
        //     this.setState({ingredients: {...response.data}});
        // })
        // .catch( error => {
        //     this.setState({error: true});
        // });
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.idToken !== null,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInitIngredient: () => dispatch(actions.initIngredients()),
        onIngredientAdded: (igName) => dispatch(actions.addIngredient(igName)),
        onIngredientRemoved: (igName) => dispatch(actions.removeIngredient(igName)),
        onInitPurchase: () => dispatch(actions.initPurchase()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, orderAxiosInstance));