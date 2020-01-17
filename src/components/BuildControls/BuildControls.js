import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    {label: "Salad", type: "salad"},
    {label: "Bacon", type: "bacon"},
    {label: "Cheese", type: "cheese"},
    {label: "Meat", type: "meat"},
];

const buildControls = ( props ) => {
    return (
        <div className={classes.BuildControls}>
        <p> Current Price: <strong> {props.price.toFixed(2)} </strong> </p>
            {
                controls.map( ( ctrl ) => {
                    return <BuildControl 
                            addIngredient={() => props.addIngredient(ctrl.type)}
                            removeIngredient={() => props.removeIngredient(ctrl.type)}
                            disabled={props.disabledInfo[ctrl.type]}
                            label={ctrl.label}
                            key={ctrl.label} />
                })
            }
            <button 
                className={classes.OrderButton}
                disabled={!props.purchaseble}
                onClick={props.purchaseHandler}>{props.isAuthenticated ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
        </div>
    );
    
}

export default buildControls;