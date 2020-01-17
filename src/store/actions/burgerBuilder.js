import * as actionTypes from "./actionTypes";
import orderAxiosInstance from "../../axios/order";

export const addIngredient = ( igName ) => {
    return {
        type: actionTypes.ADD_INGREDIENT, 
        ingredientName: igName
    }
}

export const removeIngredient = ( igName ) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT, 
        ingredientName: igName
    }
}

const setIngredients = ( ingredients ) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients
    }
}

const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        orderAxiosInstance.get("ingredients.json")
        .then( response => {
            const ingredients = {...response.data};
            dispatch(setIngredients(ingredients));
        })
        .catch( error => {
            dispatch(fetchIngredientsFailed());
        });
        
    }
}