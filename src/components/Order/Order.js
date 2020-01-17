import React from "react";

import classes from "./Order.css";

const order = ( props ) => {

    const ingredients = [];

    for(let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName].quantity
            }
        );
    }

    const ingredientOutput = ingredients.map( (order) => {
        return (
            <span style={{
                padding: "0px 5px",
                margin: "0 8px",
                border: "1px solid #eee",
                display: "inline-block",
                textTransform: "capitalize"
            }}
            key={order.name}> {order.name} ({order.amount}) </span>
        )
    });

    return (
        <div className={classes.Order}>
            <p> Ingredients:  {ingredientOutput} </p>
            <p> Price: <strong> USD {props.price.toFixed(2)} </strong> </p>
        </div>
    );
};

export default order;