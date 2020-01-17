import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.css";

const bugger = ( props ) => {
    const transformedIngredients = Object.keys(props.ingredients)
    .map( igKey => {
        return [...Array(props.ingredients[igKey].quantity)]
        .map( ( _, i ) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />;
        });
    }).reduce( ( accumulator, currentValue ) => {
        return accumulator.concat( currentValue );
    }, [<BurgerIngredient key="start" type="bread-top" />]);

    transformedIngredients.push(<BurgerIngredient key="end" type="bread-bottom" />);

    if (transformedIngredients.length === 2) {
        const p = <p key="p"> Please start adding ingredients! </p>;
        transformedIngredients.splice(1, 0, p);
    }

    return (
        <div className={classes.Burger}>
            {transformedIngredients}
        </div>
    );

};

export default bugger;