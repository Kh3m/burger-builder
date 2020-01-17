import React from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Button from "../UI/Button/Button";

const orderSummary = ( props ) => {

    const summary = Object.entries(props.ingredients)
    .map ( ( entries ) => {
        let [key, value] = entries;
        return <li key={key}><span style={{ textTransform: "capitalize" }}>{key}: </span> {value.quantity} </li>
    });

    return (
        <Auxiliary>
            <h3> Your Order </h3>
            <p> A delicious burger with the following ingredients: </p>
            <ul>
                {summary}
            </ul>
            <p><strong> {`Total Price: ${props.totalPrice.toFixed(2)}`} </strong></p>
            <p> Continue to Checkout? </p>
            <Button clicked={props.purchaseCancelHandler} btnType="Danger">CANCEL</Button>
            <Button clicked={props.purchaseContinueHandler} btnType="Success">CONTINUE</Button>
        </Auxiliary>
    );
    
}

export default orderSummary;