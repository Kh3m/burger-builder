import * as actionTypes from "../actions/actionTypes";

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const reducer = (state = initialState, action) => {

    switch(action.type) {

        case (actionTypes.SET_INGREDIENTS): {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: 4,
                error: true,
                building: false
            }
        }

        case (actionTypes.FETCH_INGREDIENTS_FAILED): {
            return {
                ...state,
                error: true
            }
        }

        case (actionTypes.ADD_INGREDIENT): {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: {
                        ...state.ingredients[action.ingredientName],
                        quantity: state.ingredients[action.ingredientName].quantity + 1
                    }
                },
                totalPrice: state.totalPrice + state.ingredients[action.ingredientName].price,
                building: true
            }
        }

        case (actionTypes.REMOVE_INGREDIENT): {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [state.ingredients[action.ingredientName]]: {
                        ...state.ingredients[action.ingredientName],
                        quantity: state.ingredients[action.ingredientName].quantity - 1
                    }
                },
                totalPrice: state.totalPrice - state.ingredients[action.ingredientName].price,
                building: true
            }
        }

        default: 
            return state;
    }
   
}

export default reducer;